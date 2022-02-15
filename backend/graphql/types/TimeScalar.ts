import { GraphQLError, GraphQLScalarType, Kind } from 'graphql'

export const TimeMsg = new GraphQLScalarType({
  name: 'TimeMsg',
  description: 'A string for time from ISO string',
  serialize: (value: Date) => {
    let hour = ''
    let minute = ''

    hour =
      value.getHours() < 10
        ? '0' + value.getHours()
        : value.getHours().toString()

    minute =
      value.getMinutes() < 10
        ? '0' + value.getMinutes()
        : value.getMinutes().toString()

    return hour + ':' + minute
  },
  parseValue: (value: Date) => {
    if (value === undefined) {
      throw new GraphQLError('Field error: value must not be undefined')
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
