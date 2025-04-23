const dotenv =require('dotenv')
const express=require('express')
const app=express()
const productRoutes=require('./routes/product.route')
const cookieParser=require('cookie-parser')
const connectDB=require('./db/db')
const rabbitMq=require('./rabbitmq')


dotenv.config()
connectDB()
rabbitMq.connect()
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser())



app.use('/',productRoutes)

app.get("/", (req, res) => {
    res.send("product Service is Running! 🚀");
  });

module.exports=app