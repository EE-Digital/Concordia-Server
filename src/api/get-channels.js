const getChannels = require("../database/getChannels");

module.exports = (app, io) => {
    app.get("/get-channels", async (req, res) => {

        const channels = await getChannels();

        res.send(channels);
    });
};
