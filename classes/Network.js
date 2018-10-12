const NNode = require('./NNode');
const InputNode = require('./InputNode');
const OutputNode = require('./OutputNode');
const {createNullArray, sumElements} = require('../misc');
const {gradientDescent} = require('../learn');

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
        });

        this.lessonsLearnt = 0;
        this.cost = Infinity;
        this.iterations = 0;
    }

    getThetaMatrix() {
        const matrix = [];
        const hide = this.hidden.map(layer => layer.slice(1));
        [...hide, this.outputs].forEach(layer => {
            matrix.push(layer.map(node => node.theta));
        });
        return matrix;
    }

    setThetaMatrix(matrix) {
        const outThetas = matrix.pop();
        const hiddenThetas = matrix;
        this.outputs.forEach((output, index) => {
          output.theta = outThetas[index];
        });
        this.hidden.forEach((layer, layerIndex) => {
          layer.forEach((node, nodeIndex) => {
              if (nodeIndex===0) return;
              node.theta = hiddenThetas[layerIndex][nodeIndex -1];
          });
        });
    }


    getGradientMatrix() {
        const matrix = [];
        const hide = this.hidden.map(layer => layer.slice(1));
        [...hide, this.outputs].forEach(layer => {
            matrix.push(layer.map(node => node.gradients));
        });
        return matrix;
    }

    updateGradients() {
        const matrix = [this.inputs, ...this.hidden, this.outputs];
        matrix.forEach((layer, layerIndex) => {
            if (layerIndex === 0) return;
            layer.forEach((node, nodeIndex) => {
                if(nodeIndex === 0 && layerIndex<matrix.length-1) return;
                node.setGradients(matrix[layerIndex - 1].map(inputNode => inputNode.activation));
            })
        });
    }

    resetCellState() {
        this.hidden.forEach((layer) => {
           layer.forEach((node, nodeIndex) => {
               if(nodeIndex === 0) return;
               node.delta = 0;
               node.resetGradients();
           })
        });
        this.outputs.forEach((node) => {
            node.delta = 0;
            node.cost = 0;
            node.resetGradients();
        })
    }

    forwardStart(input){
        let activations = [null, ...input].map((e,i) => this.inputs[i].forwardProp(e));
        [...this.hidden, this.outputs].forEach((e) => {
            activations = [ ...this.activateLayer(e, activations)];
        });
        return activations;
    }

    backwardStart(teacherValues) {
        let deltas = this.outputs.map((e, i) => e.backwardProp(teacherValues[i]));
        const hide = !this.hidden.length ? [] : this.hidden.reverse().map(e => e.slice(1));
        hide.forEach((layer) => {
            deltas = layer.map((cell, cellIndex) => {
              const indDeltas = deltas.map(outputCell => outputCell[cellIndex]);
              const back = cell.backwardProp(indDeltas);
              return back;
            });
        });
    }

    activateLayer(layer, input) {
        const activations = layer.map(e => e.forwardProp(input));
        return activations;
    }

    getRegularization() {
        const costs = [];
        this.hidden.forEach((e, i) => {
            costs.push(e.reduce((sum, current) => {
                return sum + (current.theta ? sumElements(current.theta.map(e => e ** 2)) : 0);
            }, 0))
        });
        costs.push(this.outputs.reduce((sum, current) => {
            return sum + sumElements(current.theta.map(e => e ** 2));
        }, 0));
        return sumElements(costs);
    }

    getReport() {
        const {iterations, cost} = this;
        const thetas = this.getThetaMatrix();
        return { iterations, cost, thetas };
    }

    iterate(inputs, outputs) {
        let cost = 0;
        const LAMBDA = 0.0005;
        inputs.forEach((input, inputIndex) => {
            this.forwardStart(input);
            this.backwardStart(outputs[inputIndex]);
            cost += sumElements(this.outputs.map((e, i) => e.getCost(outputs[inputIndex][i])));
            this.lessonsLearnt += 1;
            this.updateGradients();
        });
        cost += LAMBDA / this.lessonsLearnt * this.getRegularization();
        // console.log(`cost in iteration ${this.iterations}: ${this.cost}`);
        return cost;
    }

    learn(inputs, outputs) {
        const LEARNING_RATE = 0.1;

        const cost = this.iterate(inputs, outputs);
        // console.log(`iteration: ${this.iterations}, improvement: ${this.cost - cost}, running cost: ${cost}`);
        // console.log(`deltas: ${this.getGradientMatrix()}`);
        // console.log(`thetas: ${this.getThetaMatrix()}`);
        if (this.iterations > 2000 ) {
            console.log(`done learning`);
            return this.cost;
        }
        else {
            this.cost = cost;
            const nextThetas = gradientDescent(this.getThetaMatrix(), this.getGradientMatrix(), LEARNING_RATE);
            this.setThetaMatrix(nextThetas);
            this.resetCellState();
            this.lessonsLearnt = 0;
            this.iterations += 1;
            return this.learn(inputs, outputs);
        }
    }

    run(inputs) {
        console.log(`running with input ${inputs}`);
        this.forwardStart(inputs);
        const results = this.outputs.map(node => node.activation);
        return results;
    }
}

module.exports = Network;
