import express from "express";
import dotenv from "dotenv";
import accountRouter from "./Routes/accountR.js";
import authTokenRouter from "./Routes/auth_token.js"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import noteRouter from "./Routes/notesRoutes/noteRouter.js"

dotenv.config();

const PORT= process.env.PORT //3000;
const app=express();
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.text())
app.use(cookieParser())
app.use("/account",accountRouter)
app.use("/notes", noteRouter)

app.use("/auth-token", authTokenRouter)


const boostrap=async()=>{
    await mongoose.connect(process.env.MONGODB_URL)
    app.listen(PORT, ()=>{
        console.log('servidor levantado en el puerto :', PORT)
    })
}

boostrap()