module.exports = (app, io) => {
	app.post("/channels/:channel/messages", async (req, res) => {
		const addMessage = require("../database/addMessage");
		const { message, user } = req.body;
		const { channel } = req.params;

		if (!message || !channel)
			return res.status(400).send({ message: `Missing: ${!channel ? 'channel ID' : 'message content'}` });

		if (!user || !user.id)
			return res.status(400).send({ message: `Missing userID!` });

		const newMessage = await addMessage(message, channel, user);

		io.emit('update', newMessage);

		res.send({
			status: 200,
			message: newMessage,
		});
	});
};
