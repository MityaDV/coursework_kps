import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class UserGraphQL {
  @Field(() => Int)
  id: number
  @Field(() => String)
  userName: string
  @Field(() => Date)
  created: Date
}
