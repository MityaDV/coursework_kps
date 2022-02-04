import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class ChatRoomGraphQL {
  @Field(() => ID, { nullable: true })
  id: number
  @Field(() => String, { nullable: true })
  chatName: string
  @Field(() => Date, { nullable: true })
  createAt: Date
}
