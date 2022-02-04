import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class UserChatInfoGraphQL {
  @Field(() => Int)
  userId: number
  @Field()
  message: string
  @Field(() => Date)
  createdAt: Date
  @Field(() => Int)
  chatId: number
}
