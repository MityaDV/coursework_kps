import express from 'express'
import { ChatRoom } from './models/ChatRoom'

export const chatRouter = express.Router()
chatRouter.get('/', async (req, res) => {
  const data = await ChatRoom.find()
  res.json(data)
})
