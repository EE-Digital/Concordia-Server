const pool = require("../handlers/mariadb");

function makeId(length) {
    let ID = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < length; i++) {
        ID += characters.charAt(Math.floor(Math.random() * 36));
    }
    return ID;
}

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
