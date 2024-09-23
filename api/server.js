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



// Use middlewares
server.use(middlewares);

// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

// Enable CORS
// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Allow any origin
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});

// Export the Server API
module.exports = server;
