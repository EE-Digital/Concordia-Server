module.exports = (app, io) => {
	app.post("/add-message", async (req, res) => {
		const addMessage = require("../database/addMessage");
		const { message } = req.body;
		
		if (!message) return res.sendStatus(400);

		const newMessage = await addMessage(message);

		
		//! Sending update!!!
		console.log("SENDING UPDATE!!!");
		console.log(newMessage);
		
		
		io.emit('update', newMessage);

		res.send({
			status: 200,
			message: newMessage,
		});
	});
};
