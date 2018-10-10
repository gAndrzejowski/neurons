const NNode = require('./NNode');
const InputNode = require('./InputNode');
const OutputNode = require('./OutputNode');
const {createNullArray} = require('../misc');

class Network {

    constructor(inputs = 1, outputs = 1, hidden = []) {
        const randomize = thetaLength => createNullArray(thetaLength).map(() => Math.random());
        this.inputs = [new InputNode(1)].concat(createNullArray(inputs).map(() => new InputNode()));

        let lastLength = this.inputs.length;
        this.hidden = [];

        hidden.forEach((e) => {
            const layer = [new InputNode(1)].concat(createNullArray(e).map(
                () => {
                    const thetas = randomize(lastLength);
                    return new NNode(thetas);
                }
            ));
            lastLength = e + 1;
            this.hidden.push(layer);
        });

        this.outputs = createNullArray(outputs).map(() => {
            const thetas = randomize(lastLength);
            return new OutputNode(thetas);
        })
    }
}

module.exports = Network;
