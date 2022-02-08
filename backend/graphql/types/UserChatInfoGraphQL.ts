import { Field, Int, ObjectType } from 'type-graphql'
import { UserGraphQL } from './UserGraphQL'
import { ChatRoomGraphQL } from './ChatRoomGraphQL'

@ObjectType()
export class UserChatInfoGraphQL {
  @Field(() => UserGraphQL, { nullable: true })
  user: UserGraphQL
  @Field()
  message: string
  @Field(() => Date, { nullable: true })
  createdAt: Date
  @Field(() => ChatRoomGraphQL, { nullable: true })
  chat: ChatRoomGraphQL
}
