
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
const path = require('path');

const server = jsonServer.create();

// Enable both read and write operations
const router = jsonServer.router(path.join(__dirname, 'db.json'));

// Use default middlewares for JSON Server
server.use(jsonServer.defaults());

// Add custom middleware (optional)
// server.use((req, res, next) => {
//     // Your custom middleware logic here
//     next();
// });

server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);   

});
