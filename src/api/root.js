const config = require("../../config.json");

module.exports = (app, io) => {
	app.get("/", (req, res) => {
		return res.send(config);
	});
};
