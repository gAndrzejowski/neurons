const NNode = require('./NNode');

class InputNode {
    constructor(fixedValue) {
        this.fixedValue = fixedValue
    }
    forwardProp(value) {
        this.activation = this.fixedValue || value;
        return this.activation;
    };
    backwardProp() {return false};
}

module.exports = InputNode;
