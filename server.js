const Network = require('./classes/Network');
const fs = require('fs');
const http = require('http');
const url = require('url');

const net = new Network(800,10,[50,50,50]);

const app = http.createServer((req, res) => {
    let body = [];
    if (req.method === 'POST') {
        req.on('data', data => {
            body.push(data)
        }).on('end', () => {

            body = Buffer.concat(body).toString('utf8');
            const parsedBody = JSON.parse(body);
            const data = parsedBody.data;
            const expectedVal = parsedBody.expectedVal;
            if (req.url.includes('ask')) {
                const question = data.split(',');
                question.pop();
                const output = net.run(question).map((prop, digit) => ({answer: digit, prop}));
                res.writeHead(200, {"Content-type": "text/plain"});
                res.write(JSON.stringify(output));
                res.end();
                return;
            }
            const prevData = JSON.parse(fs.readFileSync('data.json'));
            prevData.inputs.push(data.split(','));
            prevData.outputs.push(expectedVal);
            prevData.inputs[prevData.inputs.length - 1].pop();
            fs.writeFileSync('data.json', JSON.stringify(prevData));
            res.end();
            return;
        })
    }
    else {
        fs.readFile('index.html','utf8',(err, data) => {
            if (err) throw err;
            res.writeHead(200, {"Content-type": "text/html"});
            res.write(data);
            res.end();
            return;
        });
    }
});
const {inputs, outputs} = JSON.parse(fs.readFileSync('data.json'));
net.learn(inputs, outputs);
app.listen(3009);
