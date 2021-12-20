import { Field, InputType } from 'type-graphql'

@InputType()
export class UserRegisterInputGraphQL {
  @Field()
  userName: string
  @Field(() => String)
  password: string
}
