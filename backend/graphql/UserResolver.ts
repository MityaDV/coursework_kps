import { UserGraphQL } from './types/UserGraphQL'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { User } from '../typeorm/models/User'
import bcrypt from 'bcrypt'
import { UserRegisterInputGraphQL } from './types/UserRegisterInputGraphQL'
import { UserRegisterGraphQL } from './types/UserRegisterGraphQL'
import jwt from 'jsonwebtoken'
import { Config } from './config'
import { AppContext } from './types/AppContext'

@Resolver()
export class UserResolver {
  @Mutation(() => UserRegisterGraphQL)
  async userRegister(
    @Arg('data', () => UserRegisterInputGraphQL)
    data: UserRegisterInputGraphQL
  ): Promise<UserRegisterGraphQL> {
    let user = await User.findOne({ where: { userName: data.userName } })
    if (user) {
      const error = new Error(
        `User with given name(${data.userName}) already exists.`
      ) as any
      error.code = 422
      throw error
    }
    user = new User()
    user.userName = data.userName
    user.password = bcrypt.hashSync(data.password, 10)
    await user.save()
    const out = new UserRegisterGraphQL()
    out.user = user
    out.token = jwt.sign(
      { id: user.id, userName: user.userName },
      Config.secretKey,
      { expiresIn: '60 days' }
    )
    return out
  }

  @Mutation(() => UserRegisterGraphQL)
  async userLogin(
    @Arg('data', () => UserRegisterInputGraphQL, { validate: false })
    data: UserRegisterInputGraphQL,
    @Ctx() ctx: AppContext
  ): Promise<UserRegisterGraphQL> {
    const user = await User.findOneOrFail({
      where: { userName: data.userName },
    })
    if (bcrypt.compareSync(data.password, user.password)) {
      const out = new UserRegisterGraphQL()
      out.user = user
      out.token = jwt.sign(
        { id: user.id, userName: user.userName },
        Config.secretKey,
        { expiresIn: '60 days' }
      )
      ctx.session.res.cookie('token', out.token, { path: '/' })
      return out
    }
    throw new Error('Wrong user name or password.')
  }

  @Query(() => UserGraphQL)
  @Authorized()
  async checkAuthorizationUser(@Ctx() ctx: any) {
    return User.findOneOrFail(ctx.user.id)
  }
}
