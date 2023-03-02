import express, { Express, Response, Request } from "express";
import userRouter from './routes/user_routes'
import todoRouter from './routes/todo_route'
import tokenRouter from './routes/token_route'
const app: Express = express();
import { config } from 'dotenv'
import { connectDB } from "./utils/connect";
import cors from "cors";
import morgan from "morgan";
import notFound from './error/not_found';
import errorHandler from "./helper/error_handler";
// load dotenv files
config()


app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/user', userRouter);
app.use('/api/v1/todo', todoRouter);
app.use('/api/v1/token', tokenRouter);
// incase the route hit was not found then it hit this api end point
app.use(notFound);
app.use(errorHandler);


// port number
const port: string | number = process.env.PORT || 5000;
// Url
const dbUrl: string = process.env.DB_URL!;

app.listen(port, async () => {
    console.log(`Listening to port ${port} 😎`);
    await connectDB(dbUrl)
})

