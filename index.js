import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter.js";
import accountRouter from "./routers/accountRouter.js";

dotenv.config();

const app = express();
app.use(cors(), json());

app.use(authRouter);
app.use(accountRouter);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server run in PORT " + PORT))