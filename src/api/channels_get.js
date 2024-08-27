const getChannels = require("../database/channels_get");

module.exports = (app, io) => {
    app.get("/channels/get", async (req, res) => {

        const channels = await getChannels();

        res.send(channels);
    });
};
