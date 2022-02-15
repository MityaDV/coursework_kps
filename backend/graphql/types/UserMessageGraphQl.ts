import { Field, ID, ObjectType } from 'type-graphql'
import { UserGraphQL } from './UserGraphQL'
import { ChatRoomGraphQL } from './ChatRoomGraphQL'
import { TimeMsg } from './TimeScalar'

@ObjectType()
export class UserMessageGraphQl {
  @Field(() => ID)
  id: number
  @Field(() => UserGraphQL)
  user: UserGraphQL
  @Field(() => String)
  message: string
  @Field(() => TimeMsg)
  createdAt: string
  @Field(() => ChatRoomGraphQL)
  chat: ChatRoomGraphQL
}
