const dotenv =require('dotenv')
const express=require('express')
const app=express()
const cartRoutes=require('./routes/cart.route')
const cookieParser=require('cookie-parser')
const connectDB=require('./db/db')
const rabbitMq=require('./rabbitmq')


dotenv.config()
connectDB()
rabbitMq.connect()
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser())



app.use('/',cartRoutes)
app.get("/", (req, res) => {
    res.send("cart Service is Running! 🚀");
  });

module.exports=app