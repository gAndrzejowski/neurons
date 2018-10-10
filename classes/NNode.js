const {sigmoid, vectorMultiply, vectorSum, elementMultiply, sumElements} = require('../misc');

class NNode {
    constructor(theta) {
        this.theta = theta;
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
        const factor = this.theta * (1 - this.theta);
        this.delta = raw * factor;
        return elementMultiply(this.theta, this.delta);
    }
}

module.exports = NNode;
