const pool = require("../handlers/mariadb");

module.exports = async (channel) => {
	let conn;
	try {
		conn = await pool.getConnection();
		let messages = await conn.query("SELECT * FROM (SELECT * FROM messages WHERE channel=? ORDER BY id DESC LIMIT 40) AS recent_messages ORDER BY id ASC", [channel]);

		if (messages.length < 1) return [];

		messages.forEach(message => {
			message.id = Number(message.id)
		});

		return messages;
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
	}
};
