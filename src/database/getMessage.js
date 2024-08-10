const pool = require("../handlers/mariadb");

module.exports = async () => {
	let conn;
	try {
		conn = await pool.getConnection();
		return await conn.query("SELECT * FROM messages");
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
	}
};
