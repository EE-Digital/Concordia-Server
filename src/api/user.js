const getUser = require("../database/user");
const respond = require("../scripts/respond");

module.exports = (app, io) => {
    app.get("/users/:id", async (req, res) => {
        const { accesstoken } = req.headers
        const { id } = req.params;

        if (!accesstoken) return res.status(403).send({ message: "Missing access token!" });

        const user = await getUser(accesstoken, id);

        return respond(user, res);
    });
};
