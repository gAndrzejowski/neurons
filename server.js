const Network = require('./classes/Network');
const fs = require('fs');

const net = new Network(1,1,[10]);
const inputs = new Array(3).fill(0).map((e, i) => [i*0.2]);
const outputs = inputs.map(e => [e[0] * 2]);

net.learn(inputs, outputs);
let output = '';
for (let i=0; i<=0.5; i+=0.02) {
    const res = net.run([i]);
    output+=`${i};${res}\n`;
}
fs.writeFileSync('results.csv', output.replace(/\./g, ','));
