const http=require('http')
const app=require('./app')

const server=http.createServer(app)

PORT=3001
server.listen(PORT,()=>{
    console.log(`user service is  running on port ${PORT}`)
})

// const http = require('http');
// const app = require('./app');
// const connectDB = require('./db/db');
// const { connect } = require('./rabbitmq');

// const PORT = process.env.PORT || 3001;

// async function startServer() {
//   try {
//     await connectDB();
//     await connect(); // RabbitMQ connect

//     const server = http.createServer(app);
//     server.listen(PORT, () => {
//       console.log(`✅ User service running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error('❌ Error starting server:', err.message);
//     process.exit(1); // Hard fail if any critical service is down
//   }
// }

// startServer();
