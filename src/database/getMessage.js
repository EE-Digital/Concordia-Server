const pool = require("../handlers/mariadb");

module.exports = async () => {
	let conn;
	try {
		conn = await pool.getConnection();
		let messages = await conn.query("SELECT * FROM messages");
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
