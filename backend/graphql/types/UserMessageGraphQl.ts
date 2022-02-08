import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class UserMessageGraphQl {
  @Field(() => String)
  message: string
}
