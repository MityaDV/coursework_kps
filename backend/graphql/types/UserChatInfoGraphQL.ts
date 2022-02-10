import { Field, ID, ObjectType } from 'type-graphql'
import { UserGraphQL } from './UserGraphQL'
import { ChatRoomGraphQL } from './ChatRoomGraphQL'

@ObjectType()
export class UserChatInfoGraphQL {
  @Field(() => ID)
  id: number
  @Field(() => UserGraphQL)
  user: UserGraphQL
  @Field(() => String, { nullable: true })
  message: string
  @Field(() => Date)
  createdAt: Date = new Date()
  @Field(() => ChatRoomGraphQL)
  chat: ChatRoomGraphQL
}
