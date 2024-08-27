const respond = require('../scripts/respond')

module.exports = (app, io) => {
	app.post("/channels/:channel/messages", async (req, res) => {
		const addMessage = require("../database/channels_messages_add");
		const { message } = req.body;
		const { channel } = req.params;
		const { accesstoken } = req.headers;

		if (!accesstoken) return res.status(403).send({ message: `Missing accessToken!` });

		if (!message || !channel)
			return res.status(400).send({ message: `Missing: ${!channel ? 'channel ID' : 'message content'}` });


		const newMessage = await addMessage(message, channel, accesstoken);

		respond(newMessage, res);

		if (newMessage.status) return;
		io.emit('update', newMessage);
	});
};
