const pool = require("../handlers/mariadb");

module.exports = async (accessToken, id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let user;

        if (accessToken)
            user = await conn.query("SELECT u.* FROM users u JOIN tokens at ON u.id = at.id WHERE at.token=?", [accessToken]);
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
