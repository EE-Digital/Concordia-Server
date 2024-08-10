const pool = require("../handlers/mariadb");

module.exports = async (message) => {
	let conn;
	try {
		conn = await pool.getConnection();
		const timestamp = Date.now();
		conn.query("INSERT INTO messages VALUES (?,?)", [timestamp,message]);
		return message;
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
	}
};
