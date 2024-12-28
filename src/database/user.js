const pool = require("../handlers/mariadb");

module.exports = async (accessToken, id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let user;

        // Get user server data [nickname, profilePicture]
        if (accessToken && !id)
            user = await conn.query("SELECT d.id,d.username,u.profilePicture, u.nickname FROM (SELECT l.id, l.username FROM logins l JOIN tokens t ON l.id = t.id WHERE t.token=?) d JOIN users u ON d.id = u.id", [accessToken]);
        else
            user = await conn.query("SELECT * FROM users WHERE id=?", [id]);
        user = user[0];

        if (!user)
            return { status: 404, message: "User not found!" }

        // Get user roles
        user.roles = await conn.query("SELECT roles.name FROM user_roles INNER JOIN roles ON user_roles.role_id=roles.id WHERE user_id=?", [user.id]);

        return user;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
};
