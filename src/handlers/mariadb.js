const mariadb = require("mariadb");

const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	port: "3306",
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	connectionLimit: 5,
	acquireTimeout: 1000
});

module.exports = pool;

