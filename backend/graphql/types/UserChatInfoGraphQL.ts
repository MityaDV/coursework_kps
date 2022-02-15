import { Field, ID, ObjectType } from 'type-graphql'
import { UserGraphQL } from './UserGraphQL'
import { ChatRoomGraphQL } from './ChatRoomGraphQL'
import { TimeMsg } from './TimeScalar'

@ObjectType()
export class UserChatInfoGraphQL {
  @Field(() => ID)
  id: number
  @Field(() => UserGraphQL)
  user: UserGraphQL
  @Field(() => String, { nullable: true })
  message: string
  @Field(() => TimeMsg)
  createdAt: string
  @Field(() => ChatRoomGraphQL)
  chat: ChatRoomGraphQL
}
