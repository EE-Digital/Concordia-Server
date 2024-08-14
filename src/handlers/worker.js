require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const { setupWorker } = require("@socket.io/sticky");
const { createAdapter } = require("@socket.io/cluster-adapter");
const cluster = require("cluster");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["*", "http://localhost:8081"],
		methods: ["GET", "POST"],
		allowedHeaders: ['*'],
		credentials: true,
		transports: ["websocket"],
		rejectUnauthorized: false
	},
	allowEIO3: true
});

// Use the cluster adapter for Socket.IO
io.adapter(createAdapter());
setupWorker(io);

// Setup middleware
app.use(cors());
app.use(express.json());

// Load API endpoints
const endpoints = path.join(__dirname, "../api");
fs.readdirSync(endpoints).forEach((file) => {
	const endpoint = require(path.join(endpoints, file));
	endpoint(app, io);
});

// WebSocket connection handling
require("./websocket")(io);

let requestCounter = 0;

// Process all requests to increase worker usage
app.use((req, res, next) => {
	requestCounter++;
	if (requestCounter > 15) {
		cluster.worker.send("REQ[Fork]"); // Request a new fork
		console.log(`I:[${process.pid}] requests per minute = ${requestCounter}`);
	}
	next();
});


// Start listening
server.listen(process.env.PORT, () => {
	console.log(`Worker process is running on port ${process.env.PORT}`);
});


// Remove a request every second from counter
setInterval(() => {
	if (requestCounter > 0) requestCounter--;
}, 1000); // 1 second


//! Kill workr after ttl of inactivity
setTimeout(() => {
	cluster.worker.kill();
}, process.env.TTL * 1000 * 60); // ttl = minutes
