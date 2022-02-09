import { Field, ID, InputType, Int } from 'type-graphql'

@InputType()
export class UserChatUpdate {
  @Field(() => ID, { nullable: true })
  id: number
  @Field(() => String)
  message: string
  @Field(() => Int, { nullable: true })
  user: number
  @Field(() => Int, { nullable: true })
  chat: number
}
