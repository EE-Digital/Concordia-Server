const config = require("../../config.json");
const getUser = require("../database/user");
const respond = require("../scripts/respond");

module.exports = (app, io) => {
	app.get("/", async (req, res) => {
		const { accesstoken } = req.headers;

		let response = config;
		// If given accessToken look up user and return it with request
		if (accesstoken)
			response.user = await getUser(accesstoken);

		// If no user found replace with not found
		if (response?.user?.status) response.user = "not found";

		return respond(response, res);
	});
};
