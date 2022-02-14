const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.port || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
  console.log('New WebSocket connection')

  socket.emit('message', 'Welcome!') // emit single client refering to
  socket.broadcast.emit('message', 'A new user has join') // emit to every clients except current client

  socket.on('sendMessage', (message) => {
    io.emit('message', message) // io emit to every single client
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
