import jwt from 'jsonwebtoken'
import { Config } from './graphql/config'
import express, { Request, Response, NextFunction } from 'express'
import http from 'http'
import { createConnection } from 'typeorm'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import cookieParser from 'cookie-parser'
import { chatsRouter } from './typeorm/chatsRouter'
import { userRouter } from './typeorm/userRouter'
import { userChatRouter } from './typeorm/userChatRouter'
// import {
//   ConnectionContext,
//   SubscriptionServer,
// } from 'subscriptions-transport-ws'
// import { Container } from 'typedi'
// import { execute, subscribe } from 'graphql'
// import { PubSub } from 'graphql-subscriptions'

async function startServer() {
  // const pubSub = new PubSub()
  // Container.set('pubSub', pubSub)
  const app = express()
  app.use(cookieParser())
  app.use('/users', userRouter)
  app.use('/chats', chatsRouter)
  app.use('/userChat', userChatRouter)
  const httpServer = http.createServer(app)

  await createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    logging: 'all',
    database: 'chat',
    username: 'root',
    password: '9567418a69',
    entities: ['typeorm/models/*.ts'],
    synchronize: false,
    migrations: ['typeorm/migrations/*.ts'],
  })
  console.log('db connected')
  const ext = process.env.NODE_ENV === 'production' ? 'js' : 'ts'
  const schema = await buildSchema({
    // pubSub,
    resolvers: [`${__dirname}/graphql/**/*Resolver.${ext}`],
    dateScalarMode: 'isoDate',
    authChecker: (resolverData, roles) => {
      return !!resolverData.context.user
    },
    // container: Container,
  })
  // const subscriptionServer = SubscriptionServer.create(
  //   {
  //     schema,
  //     execute,
  //     subscribe,
  //     async onConnect(
  //       connectionParams: any,
  //       socket: WebSocket,
  //       ctx: ConnectionContext
  //     ) {
  //       // console.log('ws', ctx.request.headers)
  //     },
  //   },
  //   {
  //     server: httpServer,
  //     path: '/graphql',
  //   }
  // )
  const apolloServer = new ApolloServer({
    schema: schema,
    introspection: process.env.NODE_ENV != 'production',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // {
      //   async serverWillStart() {
      //     return {
      //       async drainServer() {
      //         subscriptionServer.close()
      //       },
      //     }
      //   },
      // },
    ],
    context: (session) => {
      const out: any = {}
      let token = session.req.header('Authorization')
      if (!token) {
        token = session.req.cookies.token
      }
      if (token) {
        out.user = jwt.verify(token, Config.secretKey)
      }
      out.session = session
      return out
    },
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      credentials: true,
      origin: function (origin: any, callback: any) {
        callback(null, true)
      },
    },
  })
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 3000 }, () => {
      console.log('server started')
      resolve()
    })
  )
}

function logErrors(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack)
  next(err)
}
startServer().catch((e) => {
  console.error(e)
})
