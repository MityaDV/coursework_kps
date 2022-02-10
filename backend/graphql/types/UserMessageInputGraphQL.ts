import { Field, ID, InputType, Int } from 'type-graphql'

@InputType()
export class UserMessageInputGraphQL {
  // @Field(() => ID, { nullable: true })
  // id: number
  @Field(() => Int)
  userId: number
  @Field()
  message: string
  @Field(() => Date)
  createdAt: Date = new Date()
  @Field(() => Int)
  chatId: number
}
