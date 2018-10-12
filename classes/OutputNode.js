const NNode = require('./NNode');
const {elementMultiply, sumElements} = require('../misc');
const {SIGMOID_OUTPUTS} = require('../constants');

class OutputNode extends NNode {
    constructor(theta) {
        super(theta);
        this.cost = 0;
    }
    forwardProp(input) {
        if (SIGMOID_OUTPUTS) return super.forwardProp(input);
        else {
            this.activation = sumElements(this.getZElements(input));
            return this.activation;
        }
    }

    backwardProp(teacherValue) {
        // const delta = this.delta;
        this.delta = teacherValue - this.activation;
        // console.log(`___Output___ expected: ${teacherValue}, received: ${this.activation} -> delta: ${delta} --> ${this.delta}, cost: ${this.cost} -> ${this.getCost(teacherValue)}`);
        this.cost += this.getCost(teacherValue);
        return  elementMultiply(this.theta,this.delta).slice(1);
    }
    getCost(teacherValue) {
        const act = this.activation*0.99 + 0.005;
        // console.log('cost parts:',-1 * teacherValue * Math.log2(act), -1 * (1-teacherValue) * Math.log2(1 - act));
        return -1 * teacherValue * Math.log2(act) - (1 - teacherValue) * Math.log(1 - act);
        // return (this.delta ** 2);
    }
}

module.exports = OutputNode;