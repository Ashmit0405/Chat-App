import express from "express";
import dotenv from "dotenv";
import authrouter from "./routes/auth.route.js";
import connecttodb from "./db/index.js";
import msgrouter from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import userrouter from "./routes/user.route.js"
dotenv.config();

const PORT=process.env.PORT||5000;

const app=express();
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth",authrouter);
app.use("/api/messages",msgrouter);
app.use("/api/users",userrouter);
app.listen(PORT,()=>{
    connecttodb();
    console.log(`App listening at http://localhost:${PORT}`);
})