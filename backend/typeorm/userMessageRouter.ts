import express from 'express'
import { UsersChats } from './models/UsersChats'

export const userMessageRouter = express.Router()
userMessageRouter.get('/', async (req, res) => {
  const data = await UsersChats.find()
  res.json(data)
})
