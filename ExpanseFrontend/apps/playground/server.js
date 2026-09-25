import http from "http"
import fs from "fs"

const hostname = "127.0.0.1"
const port = 3000

const server = http.createServer((req, res) => {
  const index = fs.readFileSync("./dist/index.html")
  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain")
  res.end(index)
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
