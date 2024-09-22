// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server');
const cors = require('cors'); // Import cors
const fs = require('fs');
const path = require('path');

// Create a JSON Server instance
const server = jsonServer.create();
const filePath = path.join('db.json');
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

// Enable CORS
server.use(cors()); // Add this line to enable CORS

// Use middlewares
server.use(middlewares);

// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});

// Export the Server API
module.exports = server;
