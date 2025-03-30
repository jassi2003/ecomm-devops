const http=require('http')
const app=require('./app')


const server=http.createServer(app)

PORT=3002
server.listen(PORT,()=>{
    console.log(`product service is  running on port ${PORT}`)
})