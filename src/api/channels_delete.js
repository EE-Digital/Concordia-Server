const channels_delete = require("../database/channels_delete");
const respond = require("../scripts/respond");

module.exports = (app, io) => {
    app.post("/channels/delete", async (req, res) => {
        const { id } = req.body;
        const { accesstoken } = req.headers;

        if (!id) return res.status(400).send({ message: `Missing id!` });
        if (!accesstoken) return res.status(400).send({ message: `Missing accesstoken!` });

        respond(await channels_delete(id, accesstoken), res)
    });
};
