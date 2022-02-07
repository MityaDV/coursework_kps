import express from 'express'
import { UsersChats } from './models/UsersChats'
import { createQueryBuilder, In } from 'typeorm'

export const userChatRouter = express.Router()
userChatRouter.get('/', async (req, res) => {
  const data = await UsersChats.find({
    // relations: ['chat', 'user'],
    select: ['createdAt'],
    where: {
      user: {
        id: In([1, 2]),
      },
    },
  })
  res.json(data)
})

userChatRouter.get('/group', async (req, res) => {
  const data = await createQueryBuilder(UsersChats, 'userChat')
    .leftJoin('userChat.user', 'user')
    .select('Min(createdAt)', 'min')
    .addSelect('Min(userId)', 'userId')
    .addSelect('Min(user.userName)', 'name')
    .addSelect('Min(message)', 'msg')
    .groupBy('userChat.userId')
    .getRawMany()
  res.json(data)
})
