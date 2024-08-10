module.exports = (app) => {
	app.post("/add-message", async (req, res) => {
		const addMessage = require("../database/addMessage");
		const { message } = req.body;

		if (!message) return res.sendStatus(400);

		res.send({
			status: 200,
			message: await addMessage(message),
		});
	});
};
