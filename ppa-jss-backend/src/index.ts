import 'module-alias/register';

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import dbConnection from "./utils/mongodb";
import cookieParser from 'cookie-parser';
import authRoutes from '@/routes/auth.routes';
import cors from "cors";
import jwtMiddleware from './middlewares/jwt.middleware';
import productsRouter from './routes/products.routes';
import commentsRouter from './routes/comment.routes';
// import './types/express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: true,
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());


app.use('/auth', authRoutes);
app.use('/products', productsRouter)
app.use('/comments', commentsRouter)


dbConnection()

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;