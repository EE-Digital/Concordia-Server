require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const path = require("path");

// Make sure that json gets parsed correctly
app.use(express.json());
app.use(cors());

// Load all endpoints
const endpoints = path.join(__dirname, "src/api");
fs.readdirSync(endpoints).forEach((file) => {
	const endpoint = require(path.join(endpoints, file));
	endpoint(app);
});

// Start listening
app.listen(process.env.PORT, () => {
	console.log(`App listening on port ${process.env.PORT}`);
});
