
import { create, router as _router, defaults, rewriter } from 'json-server'
const server = create()
import { readFileSync } from 'fs'
import { join } from 'path'
const filePath = join('db.json')
const data = readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = _router(db)
const middlewares = defaults()
server.use(middlewares)
server.use(rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

export default server