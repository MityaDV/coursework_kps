import express, { Request, Response, NextFunction } from 'express'
import http from 'http'
import { createConnection } from 'typeorm'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

async function startServer() {
  const app = express()
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
    resolvers: [`${__dirname}/graphql/**/*Resolver.${ext}`],
    dateScalarMode: 'isoDate',
  })

  const apolloServer = new ApolloServer({
    schema: schema,
    introspection: process.env.NODE_ENV != 'production',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    path: '/graphql',
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
