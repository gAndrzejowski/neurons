const Network = require('./classes/Network');
const fs = require('fs');

const net = new Network(2,1,[100]);
const inputs = [[0.1, 0.1], [0.2, 0.2], [0.3, 0.1], [0.1, 0.3], [0.3, 0.3], [0.2, 0.3], [0.3, 0.2], [0.1, 0.2], [0.2, 0.1]];
const outputs = inputs.map(e => [3 * e[0] - 2 * e[1]]);

net.learn(inputs, outputs);

let results = ``;
        for (let a = 0.3; a<0.63; a+=0.01) {
            const result = net.run([a,0.45])[0].toFixed(2);
            results += `${a};${result}\n`.replace('.', ',');
        }
fs.writeFileSync('results.csv', results);

