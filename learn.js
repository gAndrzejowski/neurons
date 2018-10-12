const gradientDescent = (theta, grads, rate) => {
    // console.log('before:\ntheta:\t',theta,'\ndelta\t',delta, '\n');
    theta.forEach((layer, layerIndex) => {
        layer.forEach((node, nodeIndex) => {
            theta[layerIndex][nodeIndex] = node.map((ownTheta, thetaIndex) => ownTheta + grads[layerIndex][nodeIndex][thetaIndex] * rate);
        });
    });
    // console.log('after:', theta, '\n');
    return theta
};

module.exports = {
    gradientDescent,
};