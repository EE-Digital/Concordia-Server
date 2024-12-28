const pool = require("../handlers/mariadb");

module.exports = async (id, accesstoken) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const userId = (await conn.query("SELECT id FROM tokens WHERE token = ?", [accesstoken]))[0].id
        const roles = (await conn.query("SELECT * FROM roles WHERE id IN (SELECT role_id FROM user_roles WHERE user_id = ?)", [userId]));

        let permission = false;
        roles.forEach(role => {
            if (role.name == "Admin") permission = true;
        });
        if (!permission) return { status: 403, message: "Missing permissions!" }

        await conn.query("DELETE FROM channels WHERE id=?", [id]); // Remove channel

        const updatedChannels = (await conn.query("SELECT * FROM channels"));

        return updatedChannels;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
};
