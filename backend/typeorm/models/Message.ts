import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm'
import { ChatRoom } from './ChatRoom'

@Entity('messages')
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => ChatRoom, (chat) => chat.messages)
  @JoinColumn({ name: 'messageId' })
  message: ChatRoom
  @RelationId('message')
  messageId: number
  @Column({ type: 'datetime' })
  createdAt: Date = new Date()
}
