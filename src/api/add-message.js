module.exports = (app, io) => {
	app.post("/add-message", async (req, res) => {
		const addMessage = require("../database/addMessage");
		const { message, channel } = req.body;

		if (!message || !channel)
			return res.status(400).send({ message: `Missing: ${!channel ? 'channel ID' : 'message content'}` });

		const newMessage = await addMessage(message, channel);

		io.emit('update', newMessage);

		res.send({
			status: 200,
			message: newMessage,
		});
	});
};
