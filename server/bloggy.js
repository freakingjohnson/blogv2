require('dotenv').config()
const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  session = require('express-session'),
  massive = require('massive'),
  socket = require('socket.io'),
  getBlogs = require('./decorators/getBlogs'),
  sendMsg = require('./decorators/sendMsg'),
  getMsg = require('./decorators/getMsg'),
  getImg = require('./decorators/getImg'),
  postBlog = require('./decorators/postBlog')

const app = express()
app.use(bodyParser.json({ limit: '200mb' }))
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }))
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
sendMsg(app)
getMsg(app)
getImg(app)
postBlog(app)

const io = socket.listen(app.listen(process.env.SERVER_PORT, () => {
  console.log('wubba lubba dub dub!')
}))

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    // console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date().toString());
    }, interval);
  })
})

io.on('connection', (socket) => {
  socket.on('send message', (input) => {
    io.sockets.emit('generate response', input)
  })
})