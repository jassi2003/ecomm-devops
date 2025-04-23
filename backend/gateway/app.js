const express=require('express')
const cookieParser=require('cookie-parser')
const expressProxy=require('express-http-proxy')


const app=express()
app.use('/user', expressProxy('http://localhost:3001'))
app.use('/product', expressProxy('http://localhost:3002'))
app.use('/cart', expressProxy('http://localhost:3003'))



PORT=3000
app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
})

