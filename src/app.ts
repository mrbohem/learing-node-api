import express from 'express';
import { router } from './routes/route';
import {errorHandler} from './middleware/error-handler';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv'
import { hasPermission } from './middleware/hasPermission';
import { authRouter } from './routes/authRoute';
const cookieParser = require('cookie-parser');
import cors from 'cors';

const app = express();

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));

app.set('trust proxy', true);
app.use(express.json());
dotenv.config()


app.use(cookieSession({
    signed: false,
    httpOnly:true,
    secure:false
}))

app.use(authRouter)
app.use(hasPermission)
app.use(router);
app.use(cookieParser());
app.use(errorHandler)


export { app }