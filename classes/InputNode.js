const NNode = require('./NNode');

class InputNode {
    constructor(fixedValue) {
        this.fixedValue = fixedValue
    }
    forwardProp = value => this.fixedValue || value;
    backwardProp = () => false;
}

module.exports = InputNode;
