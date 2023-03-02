import { Request, Response } from "express";
import AsyncWrapper from "../helper/async_wrapper";
import TodoModel from "../model/todo_model";
import { StatusCodes } from "http-status-codes";
import { UserRequest } from "../middleware/auth_check";


// create todo
const createTodo = AsyncWrapper(async (req: Request, res: Response) => {
    const { title, content } = req.body;

    const todoModel = new TodoModel({ title, content })
    await todoModel.save();
    return res.status(StatusCodes.CREATED).json({
        msg: 'Todo created successfully',
        data: {}
    })
})
// Fetch all todo
const readAllTodo = AsyncWrapper(async (req: Request, res: Response) => {
    console.log( '===================+++>' ,res.locals);
    const data = await TodoModel.find({})
    return res.status(StatusCodes.CREATED).json({
        msg: 'Data found',
        data
    })
})

export { createTodo, readAllTodo }