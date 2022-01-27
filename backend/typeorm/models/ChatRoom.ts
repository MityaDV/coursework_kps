import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'

@Entity('chat_room')
export class ChatRoom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar', length: 100 })
  userName: string
  @Column({ type: 'text' })
  message: string
  @Column({ type: 'datetime' })
  createdAt: Date = new Date()
  @ManyToMany(() => User)
  @JoinTable({
    name: 'chat_users',
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    joinColumn: { name: 'messageId', referencedColumnName: 'id' },
  })
  users: User[]
}
