const mariadb = require("mariadb");
const pool = mariadb.createPool({
	host: process.env.HOST,
	port: "3306",
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: "concordia",
	connectionLimit: 5,
	acquireTimeout: 1000,
});

module.exports = pool;
