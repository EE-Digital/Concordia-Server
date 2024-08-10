const mariadb = require("mariadb");
const pool = mariadb.createPool({
	host: "127.0.0.1",
	port: "3306",
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: "chatthingie",
	connectionLimit: 5,
	acquireTimeout: 1000,
});

module.exports = pool;
