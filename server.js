import http from 'node:http'
// import path from 'node:path'
// import { dirname } from 'node:path'
// import { fileURLToPath } from 'node:url'
import { serveStatic } from './utils/serveStatic.js'
import { handleGet } from './handlers/routeHandlers.js'
import { handlePost } from './handlers/routeHandlers.js'

const PORT = 8000

const __dirname = import.meta.dirname

// const __filename = fileURLToPath(import.meta.url)
// console.log(__dirname)
// console.log("CWD", process.cwd())

// const pathToResource = path.join(__dirname, 'public', 'index.html')
// console.log(pathToResource)

const server = http.createServer(async (req, res) => {
    if (req.url === '/api') {
        if (req.method === 'GET') {
            return await handleGet(res)
        }
        else if (req.method === 'POST') {
            handlePost(req, res)
        }
    }
    else if (!req.url.startsWith('/api')) {
        return await serveStatic(req, res, __dirname)
    }
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
