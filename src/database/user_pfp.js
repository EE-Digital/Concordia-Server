const path = require("path");
const pool = require("../handlers/mariadb");
const getUser = require("./getUser");
const fs = require('fs')

module.exports = async (accessToken, filePath) => {
    let conn;
    filePath = filePath.split('/');
    filePath = filePath[filePath.length - 1];

    try {
        conn = await pool.getConnection();
        let user = await getUser(accessToken);

        if (!user) {
            if (fs.existsSync(filePath)) fs.unlinkSync(path.join(process.env.UPLOAD_PATH, filePath));

            return { status: 403, message: "Invalid accesstoken!" };
        }

        // If exists delete
        if (user.profilePicture && fs.existsSync(path.join(process.env.UPLOAD_PATH, user.profilePicture))) {
            fs.unlinkSync(path.join(process.env.UPLOAD_PATH, user.profilePicture));
        }

        // update user
        await conn.query(`UPDATE users SET profilePicture=? WHERE id=?`, [filePath, user.id]);

        const updatedUser = conn.query("SELECT * FROM users WHERE id=?", [user.id]);

        return updatedUser;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
};
