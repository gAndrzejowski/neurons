const NNode = require('./NNode');

class OutputNode extends NNode {

    backwardProp(teacherValue) {
        this.delta = teacherValue - this.activation;
        return this.delta;
    }
}

module.exports = NNode;