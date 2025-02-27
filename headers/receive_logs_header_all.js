const amqplib = require("amqplib");

const exchangeName = "header_logs";

const receiveMsg = async () => {
	const connection = await amqplib.connect("amqp://localhost");
	const channel = await connection.createChannel();
	await channel.assertExchange(exchangeName, "headers", { durable: false });
	const q = await channel.assertQueue("", { exclusive: true });
	console.log(`Waiting for messages in queue: ${q.queue}`);

	channel.bindQueue(q.queue, exchangeName, "", {
		account: "new",
		method: "google",
		"x-match": "all",
	});

	channel.consume(
		q.queue,
		(msg) => {
			if (msg.content)
				console.log(
					`Routing Key: ${JSON.stringify(
						msg.properties.headers
					)}, Message: ${msg.content.toString()}`
				);
		},
		{ noAck: true }
	);
};

receiveMsg();
