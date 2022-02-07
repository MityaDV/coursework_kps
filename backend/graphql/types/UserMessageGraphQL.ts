import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class UserMessageGraphQL {
  @Field(() => Int)
  userId: number
  @Field()
  message: string
  @Field(() => Date)
  createdAt: Date = new Date()
  @Field(() => Int)
  chatId: number
}
