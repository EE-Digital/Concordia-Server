const pool = require("../handlers/mariadb");

module.exports = async (message, channel) => {
	let conn;
	try {
		conn = await pool.getConnection();
		const timestamp = Date.now();
		conn.query("INSERT INTO messages VALUES (?,?,?)", [timestamp, message, channel]);
		return {
			id: timestamp,
			text: message,
			channel: channel
		};
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
	}
};
