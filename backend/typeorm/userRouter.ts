import express from 'express'
import { User } from './models/User'
import { createQueryBuilder } from 'typeorm'
import { UsersChats } from './models/UsersChats'

export const userRouter = express.Router()
userRouter.get('/', async (req, res) => {
  const data = await User.find()
  res.json(data)
})

userRouter.get('/userDetails', async (req, res) => {
  const data = await createQueryBuilder(User, 'user')
    .leftJoinAndSelect('user.users', 'userId')
    .getMany()
  res.json(data)
})

userRouter.get('/userMessage', async (req, res) => {
  const data = await createQueryBuilder(User, 'user')
    .leftJoin('user.users', 'userMsg')
    .select('Min(message)', 'msg')
    .groupBy('user.id')
    .getRawMany()
  res.json(data)
})
