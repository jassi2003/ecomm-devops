const http=require('http')
const app=require('./app')


const server=http.createServer(app)

PORT=3001
server.listen(PORT,()=>{
    console.log(`user service is  running on port ${PORT}`)
})