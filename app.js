const http = require('http')
const express = require('express')
const path = require('path')
const cors = require('cors')
const { Server } = require('socket.io')
require('dotenv').config()


const app = express()
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    socket.on('user-message', message => {
        io.emit('message', message)
    })
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve(__dirname, 'public')))
app.get('/', (req, res, next) => {
    return res.sendFile('/public/index.html')
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`);
})


