const pool = require("../handlers/mariadb");
const { makeId } = require("../scripts/idCreator");
const bcrypt = require('bcrypt');

module.exports = async (user) => {
    let conn;
    try {
        conn = await pool.getConnection();

        // Add user
        const timestamp = Date.now();
        user.id = timestamp + makeId(13);
        user.password = bcrypt.hashSync(user.password, 10);

        const check = await conn.query("SELECT * FROM logins WHERE username=?", [user.username]);
        if (check.length > 0) return { status: 403, message: "Username must be unique!" };

        user = await conn.query("INSERT INTO logins VALUES (?,?,?) RETURNING id,username", [user.id, user.username, user.password]);
        user = user[0];

        // Make token
        const token = Date.now() + '-' + makeId(16) + '-' + makeId(16);
        await conn.query("INSERT INTO tokens VALUES (?,?)", [token, user.id]);

        let server = require('../../config.json');

        // Get server channels
        const channels = await conn.query("SELECT * FROM channels");
        server.channels = channels;
        return { token: token, server: server };
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
};
