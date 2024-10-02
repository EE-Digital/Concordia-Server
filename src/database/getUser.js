const pool = require("../handlers/mariadb");

module.exports = async (accessToken, id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let user;

        if (accessToken)
            user = await conn.query("SELECT d.id,d.username,u.profilePicture, u.nickname FROM (SELECT l.id, l.username FROM logins l JOIN tokens t ON l.id = t.id WHERE t.token=?) d JOIN users u ON d.id = u.id", [accessToken]);
        else
            user = await conn.query("SELECT * FROM users WHERE id=?", [id]);
        user = user[0];

        return user;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
};
