const {sigmoid, vectorMultiply, vectorSum, elementMultiply, sumElements} = require('../misc');

class NNode {
    constructor(theta) {
        this.theta = theta;
        this.gradients = theta.map(e => 0);
        this.delta = 0;
    }

    getZElements(input) {
        return vectorMultiply(input, this.theta)
    }

    forwardProp(input){
        const z = this.getZElements(input);
        this.activation = sigmoid(sumElements(z));
        return this.activation;
    };

    backwardProp(weightedDeltas) {
        const raw = sumElements(weightedDeltas);
        const factor = this.activation * (1 - this.activation);
        const delta = raw * factor;
        // console.log(`___hidden___ total deltas: ${raw}, activation: ${this.activation} -> factor: ${factor}, delta: ${this.delta} -> ${this.delta + delta}`);
        this.delta = delta;
        return elementMultiply(this.theta, delta).slice(1);
    }
    setGradients(activations) {
       this.gradients = this.gradients.map((grad, gradIndex) => grad + activations[gradIndex] * this.delta);
    }
    resetGradients() {
        this.gradients = this.gradients.map(() => 0);
    }
}

module.exports = NNode;
