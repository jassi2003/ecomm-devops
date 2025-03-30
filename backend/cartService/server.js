const http=require('http')
const app=require('./app')


const server=http.createServer(app)

PORT=3003
server.listen(PORT,()=>{
    console.log(`cart service is  running on port ${PORT}`)
})