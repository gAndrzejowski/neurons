const Network = require('./classes/Network');

const net = new Network(1,1,[4, 4, 4]);

const result = net.forwardStart([1]);
console.log(result);

