import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class UserMessageInputGraphQL {
  @Field(() => Int)
  userId: number
  @Field()
  message: string
  @Field({ nullable: true })
  createdAt: Date
  @Field(() => Int)
  chatId: number
}
