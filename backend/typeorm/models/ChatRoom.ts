import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { UsersChats } from './UsersChats'

@Entity('chat_room')
export class ChatRoom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar', length: 100 })
  chatName: string
  @Column({ type: 'datetime' })
  createdAt: Date
  @OneToMany(() => UsersChats, (userChat) => userChat.chat)
  chats: UsersChats[]
}
