const amqplib = require('amqplib');

const exchangeName = "logs";
const msg = process.argv.slice(2).join(' ') || 'Subscribe, Like, & Comment';

const sendMsg = async () => {
	const connection = await amqplib.connect("amqp://localhost");
	const channel = await connection.createChannel();
	await channel.assertExchange(exchangeName, "fanout", { durable: false }); // direct, topic, headers and fanout
	channel.publish(exchangeName, "", Buffer.from(msg)); // The empty string as second parameter is the routing key and means that we don't want to send the message to any specific queue. We want only to publish it to our 'logs' exchange.
	console.log("Sent: ", msg);
	setTimeout(() => {
		connection.close();
		process.exit(0);
	}, 500);
}

sendMsg();