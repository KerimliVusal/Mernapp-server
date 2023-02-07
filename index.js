import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from '../server/router/userRouter.js'
import cors from 'cors'
  
dotenv.config()
const app=express()
app.use(cors({
    origin:[
        "http://localhost:3000","https://Mernapp-vusalkerimli.onrender.com"
    ],}
))

app.use(express.json());

app.use("/users",router);
app.listen(5000,()=>{
    mongoose.connect(process.env.Test_DB)
    .then(()=>console.log("connected to DB"))
    .catch((e)=>console.log('is not connected tos DB'))
})