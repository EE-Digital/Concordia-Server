const pool = require("../handlers/mariadb");

module.exports = async (message, channel, user) => {
	let conn;
	try {
		conn = await pool.getConnection();
		const timestamp = Date.now();
		conn.query("INSERT INTO messages VALUES (?,?,?,?)", [timestamp, message, channel, user.id]);
		return {
			id: timestamp,
			text: message,
			channel: parseInt(channel),
			user: user,
		};
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
	}
};
