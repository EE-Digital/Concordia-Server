const pool = require("../handlers/mariadb");
const { makeId } = require("../scripts/idCreator");

module.exports = async (user) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const timestamp = Date.now();
        user.id = timestamp + makeId(13);
        await conn.query("INSERT INTO users VALUES (?,?)", [user.id, user.username]);
        return user;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
};
