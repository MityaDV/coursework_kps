import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm'
import { User } from './User'
import { ChatRoom } from './ChatRoom'

@Entity('messages')
export class UsersChats extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.users)
  @JoinColumn({ name: 'userId' })
  user: User
  @RelationId('user')
  userId: number

  @ManyToOne(() => ChatRoom, (chat) => chat.chats)
  @JoinColumn({ name: 'chatId' })
  chat: ChatRoom
  @RelationId('chat')
  chatId: number

  @Column({ type: 'int' })
  messageId: number

  @Column({ type: 'text' })
  message: string

  @Column({ type: 'datetime' })
  createdAt: Date = new Date()
}
