const pool = require("../handlers/mariadb");

module.exports = async (message) => {
	let conn;
	try {
		conn = await pool.getConnection();
		conn.query("INSERT INTO messages VALUES (0,?)", [message]);
		return message;
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
	}
};
