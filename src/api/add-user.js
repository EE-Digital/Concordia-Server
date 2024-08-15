const addUser = require("../database/addUser");
const getMessage = require("../database/getMessage");

module.exports = (app, io) => {


    app.post("/users/create", async (req, res) => {
        const { username } = req.body;

        if (!username) return res.status(400).send({ message: 'Missing username!' });

        res.send(await addUser(req.body));
    });
};
