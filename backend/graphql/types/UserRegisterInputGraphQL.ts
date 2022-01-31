import { Field, InputType } from 'type-graphql'
import { CustomValidation } from '../validators/CustomValidator'

@InputType()
export class UserRegisterInputGraphQL {
  @Field()
  userName: string
  @Field(() => String)
  @CustomValidation(
    (value, args) => {
      return value.length >= 4
    },
    {
      message: 'Password must be more or equal to 6 characters',
      groups: ['register'],
    }
  )
  password: string
}
