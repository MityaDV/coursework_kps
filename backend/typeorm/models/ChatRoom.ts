import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { Message } from './Message'

@Entity('chat_room')
export class ChatRoom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar', length: 100 })
  userName: string
  @OneToMany(() => Message, (msg) => msg.message)
  messages: Message[]
  @Column({ type: 'datetime' })
  createdAt: Date = new Date()
  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable({
    name: 'user_chats',
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    joinColumn: { name: 'chatId', referencedColumnName: 'id' },
  })
  users: User[]
}
