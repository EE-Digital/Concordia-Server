require("dotenv").config();
const cluster = require("cluster");
const os = require("os");
const { setupMaster } = require("@socket.io/sticky");
const { setupPrimary } = require("@socket.io/cluster-adapter");
const http = require("http");

const httpServer = http.createServer();

// Setup sticky sessions with load balancing
setupMaster(httpServer, {
	loadBalancingMethod: "least-connection",
});

// Setup connections between workers
setupPrimary();

const maxWorkers = os.cpus().length;

// Use Round Robin scheduling for worker distribution
cluster.schedulingPolicy = cluster.SCHED_RR;

cluster.setupPrimary({
	exec: "./src/handlers/worker.js",
	args: ["--use", "https"],
});

// Fork workers
function forkWorkers(count) {
	for (let i = 0; i < count; i++) {
		if (Object.values(cluster.workers).length < maxWorkers) {
			const worker = cluster.fork();
			console.log(`Worker forked: ${worker.process.pid}`);
		}
	}
}



// Fork half of the available CPU cores
// forkWorkers(Math.ceil(maxWorkers / 2));
forkWorkers(1);

// Handle worker exit
cluster.on("exit", (worker, code, signal) => {
	console.warn(`Worker died: ${worker.process.pid}, Code: ${code}, Signal: ${signal}`);
	if (Object.values(cluster.workers).length < 1) {
		console.log("No workers left, forking a new one...");
		forkWorkers(1);
	}
});

// Handle messages from workers
cluster.on("message", (worker, message) => {
	if (message == "REQ[Fork]")
		forkWorkers(1); // Fork a new worker on message received
});
