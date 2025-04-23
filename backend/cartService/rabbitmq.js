const amqp = require('amqplib');
require('dotenv').config(); 

const RABBITMQ_URL = process.env.RABBIT_URL;

let connection, channel;

async function connect() {
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('✅ Connected to RabbitMQ');
    } catch (error) {
        console.error('❌ Failed to connect to RabbitMQ:', error.message);
        process.exit(1);
    }
}


async function subscribeToQueue(queueName, callback) {
    if (!channel) await connect();
    await channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, (message) => {
        callback(message.content.toString());
        channel.ack(message);
    });
}

const publishToQueue = async (queueName, data) => {
    if (!channel) await connectRabbitMQ();
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data))); // FIXED
  };
  

module.exports = {
    subscribeToQueue,
    publishToQueue,
    connect,
};
