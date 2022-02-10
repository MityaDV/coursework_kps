import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class ChatRoomGraphQL {
  @Field(() => Int)
  id: number
  @Field(() => String)
  chatName: string
  @Field(() => Date)
  createdAt: Date
}
