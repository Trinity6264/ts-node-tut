import { Router } from 'express'
import { readAllTodo } from '../controller/todo_controller'
import { geneAccessToken } from '../middleware/refresh_token_check';

const router = Router()


router.route<'/'>('/').get([geneAccessToken], readAllTodo)

export default router