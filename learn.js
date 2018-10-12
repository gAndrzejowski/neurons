const gradientDescent = (theta, grads, rate) => {
    theta.forEach((layer, layerIndex) => {
        layer.forEach((node, nodeIndex) => {
            theta[layerIndex][nodeIndex] = node.map((ownTheta, thetaIndex) => ownTheta + grads[layerIndex][nodeIndex][thetaIndex] * rate);
        });
    });
    return theta
};

module.exports = {
    gradientDescent,
};