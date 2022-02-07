import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import { UserChatInfoGraphQL } from './types/UserChatInfoGraphQL'
import { UsersChats } from '../typeorm/models/UsersChats'
import { UserGraphQL } from './types/UserGraphQL'
import { User } from '../typeorm/models/User'
import DataLoader from 'dataloader'
import { In } from 'typeorm'
import { ChatRoom } from '../typeorm/models/ChatRoom'
import { ChatRoomGraphQL } from './types/ChatRoomGraphQL'
import { UserMessageGraphQL } from './types/UserMessageGraphQL'

@Resolver(UserChatInfoGraphQL)
export class ChatResolver {
  @Query(() => [UserChatInfoGraphQL])
  async userChatInfo() {
    return await UsersChats.find()
  }
  userDataLoader = new DataLoader(async (ids: readonly number[]) => {
    const out = []
    const users = await User.find({ where: { id: In(ids as number[]) } })
    for (const id of ids) {
      out.push(users.find((u) => u.id == id))
    }
    return out
  })

  @FieldResolver(() => UserGraphQL)
  async user(@Root() user: UsersChats) {
    if (user.userId) return this.userDataLoader.load(user.userId)
    else return null
  }

  chatDataLoader = new DataLoader(async (ids: readonly number[]) => {
    const out = []
    const chats = await ChatRoom.find({ where: { id: In(ids as number[]) } })
    for (const id of ids) {
      out.push(chats.find((cht) => cht.id == id))
    }
    return out
  })

  @FieldResolver(() => ChatRoomGraphQL)
  async chat(@Root() chat: UsersChats) {
    if (chat.chatId) return this.chatDataLoader.load(chat.chatId)
    else return null
  }

  @Mutation(() => Boolean)
  async sendMessage(
    @Arg('data', () => UserMessageGraphQL)
    data: UserMessageGraphQL
  ) {
    const msg = new UsersChats()
    msg.userId = data.userId
    msg.chatId = 1
    msg.message = data.message
    msg.createdAt = new Date()
    await msg.save()
    return true
  }

  @Mutation(() => ChatRoomGraphQL)
  async createChat() {
    let chatRoom = await ChatRoom.findOne({ where: { id: 1 } })
    if (chatRoom) {
      return chatRoom
    }
    chatRoom = new ChatRoom()
    chatRoom.id = 1
    chatRoom.chatName = 'test_chat'
    chatRoom.createdAt = new Date()
    await chatRoom.save()
    return chatRoom
  }
}
