import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class ChatRoomGraphQL {
  @Field(() => ID)
  id: number
  @Field(() => String)
  chatName: string
  @Field(() => Date, { nullable: true })
  createdAt: Date
}
