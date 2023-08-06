const amqplib = require("amqplib");

const queueName = "wdj";
const msg = process.argv.slice(2).join(" ") || "hello world";
console.log(`Example process.argv: `, process.argv);

const sendMsg = async () => {
	const connection = await amqplib.connect("amqp://localhost"); // if running rabbitmq locally, argument should be amqp://localhost. If using rabbitmq cloud, use the uri.
	const channel = await connection.createChannel(); // creating a pipeline to rabbitmq
	await channel.assertQueue(queueName, { durable: false }); // If there isn't a queue already, it will create one. durable: true means if rabbitmq restarts, it will recreate that queues and messages again. durable needs to be in both pub and sub.
	// by default, the exchange type is the 'direct' exchange. And every message uses the routing id of the queue name.

	channel.sendToQueue(queueName, Buffer.from(msg), { persistent: true }); // routing key is the queueName. Sending to direct exchange. If there are multiple receivers, default is round robin.
	// persistent true means message will be saved to disk. It doesn't guarantee messages won't be lost.
	console.log("Sent: ", msg);
	setTimeout(() => {
		// to close the connection
		connection.close();
		process.exit(0);
	}, 500);
};

sendMsg();
