const sigmoid = (val) => (1 + Math.exp(
    -1 * val
)) ** -1;

const vectorMultiply = (arr1, arr2) => arr1.map( (e, i) => e * arr2[i]);

const vectorSum = (arr, arr2) => arr1.map( (e, i) => e + arr2[i]);

const elementMultiply = (arr, factor) => arr.map( e => e * factor);

const sumElements = arr => arr.reduce((sum, current) => sum + current);

const createNullArray = length => new Array(length).fill(null);

module.exports = {
    sigmoid,
    vectorMultiply,
    vectorSum,
    elementMultiply,
    sumElements,
    createNullArray
};
