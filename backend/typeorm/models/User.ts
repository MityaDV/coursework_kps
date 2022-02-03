import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { UsersChats } from './UsersChats'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0
  @Column({ type: 'varchar', length: 100 })
  userName: string = ''
  @Column({ type: 'varchar', length: 100 })
  password: string = ''
  @Column({ type: 'datetime' })
  created: Date = new Date()
  @OneToMany(() => UsersChats, (userChat) => userChat.user)
  users: UsersChats[]
}
