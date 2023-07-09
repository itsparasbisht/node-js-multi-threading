const { workerData, parentPort } = require("node:worker_threads");
const { start, end, id } = workerData;
let totalPrimes = 0;

const message = `thread ${id} running...`;
console.log(message);

function isPrime(num) {
  if (num < 2) return false;

  let n = Math.floor(Math.sqrt(num));

  for (let i = 2; i <= n; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

for (let i = start; i < end; i++) {
  const result = isPrime(i);
  if (result) {
    totalPrimes++;
  }
}

parentPort.postMessage(totalPrimes);
