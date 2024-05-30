const http = require('http');
const fs = require('fs');
 require('url');
const basicAuth = require('./auth');

const PORT = 3000;
const DATA_FILE = './database.json';

// Read data from the JSON file
function readData() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Write data to the JSON file
function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Handle requests
const requestHandler = (req, res) => {
    if (req.method === 'POST' && req.url === '/memories') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { id, content } = JSON.parse(body);
            const memories = readData();
            memories.push({ id, content });
            writeData(memories);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Memory created' }));
        });
    } else if (req.method === 'GET' && req.url === '/memories') {
        const memories = readData();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(memories));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
};

// Create and start the server
const server = http.createServer((req, res) => {
    basicAuth(req, res, () => requestHandler(req, res));
});

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});