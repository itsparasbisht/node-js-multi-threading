let totalPrimes = 0;

function isPrime(num) {
  let n = Math.floor(Math.sqrt(num));

  for (let i = 2; i <= n; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

console.time("time taken");
for (let i = 2; i < 100000000; i++) {
  const result = isPrime(i);
  if (result) {
    totalPrimes++;
  }
}
console.timeEnd("time taken");
console.log(totalPrimes);
