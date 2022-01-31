import express from 'express'
import { ChatRoom } from './models/ChatRoom'

export const chatsRouter = express.Router()
chatsRouter.get('/', async (req, res) => {
  const data = await ChatRoom.find()
  res.json(data)
})
