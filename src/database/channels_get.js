const pool = require("../handlers/mariadb");

module.exports = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const channels = await conn.query("SELECT * FROM channels");
        return channels;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
};
