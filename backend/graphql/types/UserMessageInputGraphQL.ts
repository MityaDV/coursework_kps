import { Field, ID, InputType, Int } from 'type-graphql'

@InputType()
export class UserMessageInputGraphQL {
  @Field(() => ID, { nullable: true })
  id: number
  @Field(() => Int, { nullable: true })
  userId: number
  @Field()
  message: string
  @Field(() => Date)
  createdAt: Date = new Date()
  @Field(() => Int, { nullable: true })
  chatId: number
}
