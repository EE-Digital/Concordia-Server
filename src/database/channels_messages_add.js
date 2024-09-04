const pool = require("../handlers/mariadb");
const getUser = require("./getUser");


module.exports = async (message, channel, accessToken) => {
	let conn;
	try {
		conn = await pool.getConnection();
		const timestamp = Date.now();
		const user = await getUser(accessToken);
		if (!user) return { status: 403, message: "Invalid accessToken!" };
		const channelCheck = (await conn.query("SELECT id FROM channels WHERE id=?", [channel]))[0];
		if (!channelCheck) return { status: 400, message: "Channel not found!" }

		const username = await conn.query("SELECT username FROM logins WHERE id=?", [user.id]);
		let result = await conn.query("INSERT INTO messages VALUES (?,?,?,?) RETURNING *", [timestamp, message, channel, user.id]);
		result = result[0];
		result.id = result.id.toString();
		result.user = user;
		result.user.username = username[0].username;
		console.log(result);

		return result;
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
	}
};
