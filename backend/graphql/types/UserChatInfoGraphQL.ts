import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import { UserGraphQL } from './UserGraphQL'
import { ChatRoomGraphQL } from './ChatRoomGraphQL'

@ObjectType()
export class UserChatInfoGraphQL {
  @Field(() => ID)
  id: number
  @Field(() => UserGraphQL, { nullable: true })
  user: UserGraphQL
  @Field(() => String, { nullable: true })
  message: string
  @Field(() => Date, { nullable: true })
  createdAt: Date
  @Field(() => ChatRoomGraphQL, { nullable: true })
  chat: ChatRoomGraphQL
}

@InputType()
export class UserChatInfoInputGraphQL {
  @Field(() => ID)
  id: number
  // @Field(() => UserGraphQL)
  // user: UserGraphQL
  @Field(() => String)
  message: string
  // @Field(() => Date, { nullable: true })
  // createdAt: Date = new Date()
  // @Field(() => ChatRoomGraphQL)
  // chat: ChatRoomGraphQL
}
