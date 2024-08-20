const pool = require("../handlers/mariadb");

module.exports = async (channel) => {
	let conn;
	try {
		conn = await pool.getConnection();
		let messages = await conn.query(`SELECT recent_messages.id AS id, recent_messages.text AS text, recent_messages.channel AS channel, JSON_OBJECT('id', users.id,'username', users.username, 'profilePicture',users.profilePicture) AS user FROM (SELECT id, text, channel, user FROM messages WHERE channel=? ORDER BY id DESC LIMIT 40 ) AS recent_messages JOIN users ON recent_messages.user = users.id ORDER BY recent_messages.id ASC`, [channel]);

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
