const getMessage = require("../database/getMessage");

module.exports = (app, io) => {
	app.get("/messages", async (req, res) => {
		res.send(await getMessage());
	});
};
