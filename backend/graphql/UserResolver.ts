import { Arg, Mutation, Resolver } from 'type-graphql'
import { User } from '../typeorm/models/User'
import bcrypt from 'bcrypt'
import { UserRegisterInputGraphQL } from './types/UserRegisterInputGraphQL'
import { UserRegisterGraphQL } from './types/UserRegisterGraphQL'
import jwt from 'jsonwebtoken'
import { Config } from './config'

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
        `User with given name(${data.userName}) already exists`
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
      { expiresIn: '30 days' }
    )

    return out
  }
  @Mutation(() => UserRegisterGraphQL)
  async userLogin(
    @Arg('data', () => UserRegisterInputGraphQL)
    data: UserRegisterInputGraphQL
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
        { expiresIn: '30 days' }
      )
      return out
    }
    throw new Error('wrong user name or password')
  }
}