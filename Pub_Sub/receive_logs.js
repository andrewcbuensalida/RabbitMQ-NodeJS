const amqplib = require("amqplib");

const exchangeName = "logs";

const receiveMsg = async () => {
	const connection = await amqplib.connect("amqp://localhost");
	const channel = await connection.createChannel();
	await channel.assertExchange(exchangeName, "fanout", { durable: false });
	const q = await channel.assertQueue("", { exclusive: true }); // empty strings mean rabbit will generate it. We don't want to retain queues for fanouts because it just takes resources. 
  // exclusive true means once the connection closes, it will delete the queue.
	console.log(`Waiting for messages in queue: ${q.queue}`);
	channel.bindQueue(q.queue, exchangeName, ""); // third argument is the routing key, which fanouts don't really care about. This corresponds to routing key, the second argument in channel.publish.
	channel.consume(
		q.queue,
		(msg) => {
			if (msg.content)
				console.log("THe message is: ", msg.content.toString());
		},
		{ noAck: true }
	);
};

receiveMsg();
