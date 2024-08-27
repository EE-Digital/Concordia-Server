const channels_create = require("../database/channels_create");
const respond = require("../scripts/respond");

module.exports = (app, io) => {
    app.post("/channels/create", async (req, res) => {
        const { title } = req.body;
        const { accesstoken } = req.headers;

        if (!title) return res.status(400).send({ message: `Missing title!` });
        if (!accesstoken) return res.status(400).send({ message: `Missing accesstoken!` });

        respond(await channels_create(title, accesstoken), res)
    });
};
