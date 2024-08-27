const addUser = require("../database/user_register");
const respond = require("../scripts/respond");

module.exports = (app, io) => {
    app.post("/users/register", async (req, res) => {
        const { username, password } = req.body;

        if (!username) return res.status(400).send({ message: 'Missing username!' });
        if (!password) return res.status(400).send({ message: 'Missing password!' });

        respond(await addUser(req.body), res);
    });
};
