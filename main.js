require("dotenv").config();
const cluster = require("cluster");
const os = require("os");

var maxWorkers = os.cpus().length;

function _fork(count) {
	for (let i = 0; i < count; i++) {
		if (Object.values(cluster.workers).length < maxWorkers) {
			cluster.fork();
		}
	}
}

cluster.schedulingPolicy = cluster.SCHED_RR;

cluster.setupPrimary({
	exec: "./src/handlers/worker.js",
	args: ["--use", "https"],
});

_fork(maxWorkers / 2);

cluster.on("exit", (worker, code, signal) => {
	console.warn(`W:[PR] Worker died [${worker.process.pid}]`);
	if (Object.values(cluster.workers).length < 1) {
		// Always keep at least 1 process running
		_fork(1);
	}
});

cluster.on("message", (data, message) => {
	_fork(1);
});
