const NNode = require('./NNode');
const InputNode = require('./InputNode');
const OutputNode = require('./OutputNode');
const {createNullArray} = require('../misc');

class Network {

    constructor(inputs = 1, outputs = 1, hidden = []) {
        const randomize = thetaLength => createNullArray(thetaLength).map(() => (2*(Math.random()-0.5)));
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

    forwardStart(input){
        let activations = [null, ...input].map((e,i) => this.inputs[i].forwardProp(e));
        [...this.hidden, this.outputs].forEach((e) => {
            activations = [ ...this.activateLayer(e, activations)];
        });
        return activations;
    }

    activateLayer(layer, input) {
        const activations = layer.map(e => e.forwardProp(input));
        return activations;
    }

}

module.exports = Network;
