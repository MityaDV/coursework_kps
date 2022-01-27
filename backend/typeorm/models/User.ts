import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ChatRoom } from './ChatRoom'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0
  @Column({ type: 'varchar', length: 100 })
  userName: string = ''
  @Column({ type: 'varchar', length: 100 })
  password: string = ''
  @OneToMany(() => ChatRoom)
  chats: ChatRoom[]
  @Column({ type: 'datetime' })
  created: Date = new Date()
}
