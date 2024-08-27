const user_login = require("../database/user_login");
const respond = require("../scripts/respond");

module.exports = (app, io) => {
    app.post("/users/login", async (req, res) => {
        const { username, password } = req.body;

        if (!username) return res.status(400).send({ message: 'Missing username!' });
        if (!password) return res.status(400).send({ message: 'Missing password!' });

        respond(await user_login(req.body), res);
    });
};
