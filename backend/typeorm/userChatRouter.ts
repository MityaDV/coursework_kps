import express from 'express'
import { UsersChats } from './models/UsersChats'

export const userChatRouter = express.Router()
userChatRouter.get('/', async (req, res) => {
  const data = await UsersChats.find()
  res.json(data)
})
