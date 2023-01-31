import express from 'express';
import { json } from 'body-parser';
import { router } from './routes/route';
import {errorHandler} from './middleware/error-handler';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv'
import { hasPermission } from './middleware/hasPermission';
import { authRouter } from './routes/authRoute';


const app = express();
app.set('trust proxy', true);
app.use(json());
dotenv.config()


app.use(cookieSession({
    signed: false,
    httpOnly:true,
    secure:false
}))

app.use(authRouter)
app.use(hasPermission)
app.use(router);

app.use(errorHandler)


export { app }