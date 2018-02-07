require('dotenv').config()
const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  session = require('express-session'),
  massive = require('massive'),
  socket = require('socket.io'),
  getBlogs = require('./decorators/getBlogs')

const app = express()
app.use(bodyParser.json())
app.use(cors())

massive(process.env.DB_CONNECTION).then((db) => {
  app.set('db', db)
})

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

app.use(express.static(`${__dirname}/../build`))

getBlogs(app)

// const io = app.listen(process.env.SERVER_PORT, () => console.log('wubba lubba dub dub!'))

// io.on('connection', (socket) => {
// socket.on('emit message', (input) => {
//   socket.emit('generate response', input)
// })
// // sends to everyone but original sender
// socket.on('broadcast message', (input) => {
//   socket.broadcast.emit('generate response', input)
// })
// socket.on('blast message', (input) => {
//   io.sockets.emit('generate response', input)
// })
// // joins the specified room
// socket.on('join room', (input) => {
//   socket.join(input.path.split('/')[1])
// })
// })


const io = socket.listen(app.listen(process.env.SERVER_PORT, () => {
  console.log('wubba lubba dub dub!')
}))

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  })
})

io.on('connection', (socket) => {
  socket.on('send message', (input) => {
    io.sockets.emit('generate response', input)
  })
})