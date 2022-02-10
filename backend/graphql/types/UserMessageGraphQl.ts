import { Field, ID, Int, ObjectType } from 'type-graphql'
import { UserGraphQL } from './UserGraphQL'
import { ChatRoomGraphQL } from './ChatRoomGraphQL'

@ObjectType()
export class UserMessageGraphQl {
  @Field(() => ID)
  id: number
  @Field(() => UserGraphQL)
  user: UserGraphQL
  @Field(() => String)
  message: string
  @Field(() => Date)
  createdAt: Date = new Date()
  @Field(() => ChatRoomGraphQL)
  chat: ChatRoomGraphQL
}
