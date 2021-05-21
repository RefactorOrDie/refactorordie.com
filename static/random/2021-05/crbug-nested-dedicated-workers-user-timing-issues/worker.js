// worker.js
const startMark = "w";
performance.mark(startMark);
console.info("worker.js executed");
const w = new Worker("./subworker.js", { type: "module" });
console.info("worker.js constructed subworker");
performance.measure("worker.js", startMark);
