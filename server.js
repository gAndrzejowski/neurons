const Network = require('./classes/Network');
const fs = require('fs');

const net = new Network(1,1,[5,5,5]);
const inputs = [];
for (let i=0; i<=1; i+=0.1) {
    inputs.push([i]);
}
const outputs = inputs.map(e => [Math.E ** (-1 * e[0])]);

net.learn(inputs, outputs);

let output = '';
for (i=0;i<=3;i+=0.1) {
    const result = net.run([i]);
    output += `${i};${result}\n`.replace(/\./g, ',');
}
fs.writeFileSync('results.csv', output);
