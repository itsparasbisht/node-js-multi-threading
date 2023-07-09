const { Worker } = require("node:worker_threads");
const CPU_COUNT = require("os").cpus().length;
let range = 1000000;
let batch = Math.ceil(range / CPU_COUNT);
let start = 0;
let end = batch;

const workerPromises = [];

console.time("time taken");
for (let i = 0; i < CPU_COUNT; i++) {
  const promise = new Promise((resolve, reject) => {
    const worker = new Worker("./worker-job", {
      workerData: { start, end, id: i + 1 },
    });

    worker.on("message", (total) => {
      resolve(total);
    });

    worker.on("error", (error) => {
      reject(error);
    });
  });

  workerPromises.push(promise);
  start += batch;
  end += batch;

  if (end > range) end = range;
}

async function findTotalPrimes() {
  const result = await Promise.all(workerPromises);
  const total = result.reduce((curr, acc) => (acc += curr), 0);
  if (total) {
    console.timeEnd("time taken");
    console.log(total);
  }
}

findTotalPrimes();
