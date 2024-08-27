const pool = require("../handlers/mariadb");
const bcrypt = require('bcrypt');

module.exports = async (user) => {
    let conn;
    try {
        conn = await pool.getConnection();

        const search = (await conn.query("SELECT * FROM logins WHERE username=?", [user.username]))[0];
        if (!search) return { status: 403, message: "Incorrect credentials!" };
        const passwordControl = bcrypt.compareSync(user.password, search.password);
        if (!passwordControl) return { status: 403, message: "Incorrect credentials!" };

        const token = (await conn.query("SELECT token FROM tokens WHERE id=?", [search.id]))[0];

        return token
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
};
