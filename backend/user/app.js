const dotenv =require('dotenv')
const express=require('express')
const app=express()
const userRoutes=require('./routes/user.routes')
const cookieParser=require('cookie-parser')
const connectDB=require('./db/db')
const rabbitMq=require('./rabbitmq')

dotenv.config()
connectDB()

rabbitMq.connect()
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser())


app.use('/',userRoutes)

app.get("/", (req, res) => {
    res.send("User Service is Running! 🚀");
  });


module.exports=app


// const dotenv = require('dotenv');
// const express = require('express');
// const cookieParser = require('cookie-parser');
// const userRoutes = require('./routes/user.routes');

// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use('/', userRoutes);

// app.get("/", (req, res) => {
//   res.send("User Service is Running! 🚀");
// });

// module.exports = app;
