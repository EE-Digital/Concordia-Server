const pool = require("../handlers/mariadb");

module.exports = async (accessToken, id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let user;
        if (accessToken)
            user = await conn.query("SELECT u.* FROM users u JOIN accessTokens at ON u.userId = at.user WHERE at.token=?", [accessToken]);
        else
            user = await conn.query("SELECT * FROM users WHER userId=?", [id]);
        return user;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
};
