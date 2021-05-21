// subworker.js
const startMark = "sw";
performance.mark(startMark);
console.info("subworker.js executed");
performance.measure("subworker.js", startMark);
