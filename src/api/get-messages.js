const getMessage = require("../database/getMessage");

module.exports = (app) => {
	app.get("/messages", async (req, res) => {
		res.send(await getMessage());
	});
};
