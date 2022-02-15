import { GraphQLError, GraphQLScalarType, Kind } from 'graphql'

export const TimeMsg = new GraphQLScalarType({
  name: 'TimeMsg',
  description: 'A string for time from ISO string',
  serialize: (value: Date) => value.getHours() + ':' + value.getMinutes(),
  parseValue: (value: Date) => {
    if (typeof value !== 'string') {
      throw new GraphQLError('Field error: value must be string')
    }
    return new Date()
  },
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError('Field error: value must be string')
    }
    return new Date()
  },
})
