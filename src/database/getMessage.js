const pool = require("../handlers/mariadb");

module.exports = async (channel) => {
	let conn;
	try {
		conn = await pool.getConnection();
		let messages = await conn.query("SELECT * FROM messages WHERE channel=?", [channel]);
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
