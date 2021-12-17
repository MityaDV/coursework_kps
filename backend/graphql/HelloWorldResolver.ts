import { Query, Resolver } from 'type-graphql'

@Resolver()
export class HelloWorldResolver {
  @Query(() => String)
  async hellowWorld() {
    return 'Hellow World'
  }
}
