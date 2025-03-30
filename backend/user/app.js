const dotenv =require('dotenv')
const express=require('express')
const app=express()
const userRoutes=require('./routes/user.routes')
const cookieParser=require('cookie-parser')
const connectDB=require('./db/db')


dotenv.config()
connectDB()
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser())



app.use('/',userRoutes)

app.get("/", (req, res) => {
    res.send("User Service is Running! 🚀");
  });


module.exports=app