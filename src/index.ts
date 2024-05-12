import express, { Express } from "express";
import { userListRouter } from "../src/routes/users_list";
import { connectMongo } from './db'
import { connectRedis } from './cache'

connectMongo();
connectRedis();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use('/', userListRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
export default app;
