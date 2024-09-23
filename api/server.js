
// const jsonServer = require('json-server')
// const server = jsonServer.create()
// const fs = require('fs')
// const path = require('path')
// const filePath = path.join('db.json')
// const data = fs.readFileSync(filePath, "utf-8");
// const db = JSON.parse(data);
// const router = jsonServer.router(db)
// const middlewares = jsonServer.defaults()
// server.use(middlewares)
// server.use(jsonServer.rewriter({
//     '/api/*': '/$1',
//     '/blog/:resource/:id/show': '/:resource/:id'
// }))
// server.use(router)
// server.listen(3000, () => {
//     console.log('JSON Server is running')
// })

// module.exports = server


const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');

// Define the path to your db.json
const filePath = path.join(__dirname, 'db.json');

// Use the router with the db.json file to allow write operations
const router = jsonServer.router(filePath);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Custom rewriter rules
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

// Use the router to handle the requests
server.use(router);

// Start the server
server.listen(3000, () => {
    console.log('JSON Server is running');
});

// Export the Server API
module.exports = server;
