import { UserGraphQL } from './UserGraphQL'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class UserRegisterGraphQL {
  @Field()
  token: string
  @Field(() => UserGraphQL)
  user: UserGraphQL
}
