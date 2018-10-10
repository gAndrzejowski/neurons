const NNode = require('./NNode');

class InputNode {
    constructor(fixedValue) {
        this.fixedValue = fixedValue
    }
    forwardProp(value) { return this.fixedValue || value };
    backwardProp() {return false};
}

module.exports = InputNode;
