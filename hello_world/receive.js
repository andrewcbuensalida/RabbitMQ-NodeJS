const amqplib = require("amqplib");

const queueName = "wdj";

const receiveMsg = async () => {
	const connection = await amqplib.connect("amqp://localhost");
	const channel = await connection.createChannel();
	await channel.assertQueue(queueName, { durable: false });
	channel.prefetch(1); // don't dispatch a new message to a worker until it has processed and acknowledged the previous one
	console.log(`Waiting for messages in queue: ${queueName}`);
	channel.consume(
		queueName,
		(msg) => {
			setTimeout(() => {
				console.log("[X] Received:", msg.content.toString());
				channel.ack(msg);
			}, 5000);
		},
		{ noAck: false } // true means acknowledgments are automatic. better to make this manual because if receive crashes before it gets processed, automatic will tell the publisher that it was successful.
	);
};

receiveMsg();
