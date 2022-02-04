import { Field, Int, ObjectType } from 'type-graphql'
import { UserChatInfoGraphQL } from './UserChatInfoGraphQL'

@ObjectType()
export class UserGraphQL {
  @Field(() => Int, { nullable: true })
  id: number
  @Field(() => String, { nullable: true })
  userName: string
  @Field(() => Date, { nullable: true })
  created: Date
}
