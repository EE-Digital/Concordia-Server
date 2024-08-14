const getMessage = require("../database/getMessage");

module.exports = (app, io) => {


	app.get("/messages", async (req, res) => {
		const { channel } = req.body;
		console.log(req.body);

		if (!channel) return res.status(400).send({ message: 'Missing channel ID!' });

		res.send(await getMessage(channel));
	});
};
