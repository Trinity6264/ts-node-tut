import { Router } from 'express'
import { readAllTodo } from '../controller/todo_controller'
import { authCheck } from '../middleware/auth_check';

const router = Router()


router.route<'/'>('/').get([authCheck], readAllTodo)

export default router