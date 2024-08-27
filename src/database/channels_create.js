const pool = require("../handlers/mariadb");

module.exports = async (title, accesstoken) => {
    let conn;
    try {
        conn = await pool.getConnection();

        const permissionCheck = true; // TODO implement a permissions check
        if (!permissionCheck) return { status: 403, message: "Missing permissions!" }

        const channel = (await conn.query("INSERT INTO channels(title) VALUES (?) RETURNING *", [title]))[0];

        return channel;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
};
