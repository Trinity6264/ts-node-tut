import express, { Express, Response, Request } from "express";
import userRouter from './routes/user_routes'
const app: Express = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/user', userRouter);

app.listen(5000, () => { 
    console.log('Listening to port 5000');
})