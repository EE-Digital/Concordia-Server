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

		let result = await conn.query("INSERT INTO messages VALUES (?,?,?,?) RETURNING *", [timestamp, message, channel, user.id]);
		result = result[0];
		result.id = result.id.toString();
		result.user = user;
		return result;
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
	}
};
