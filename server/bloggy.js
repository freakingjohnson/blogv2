require('dotenv').config()
const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  session = require('express-session'),
  massive = require('massive'),
  socket = require('socket.io'),
  sendMsg = require('./decorators/sendMsg'),
  getMsg = require('./decorators/getMsg'),
  getBlogs = require('./decorators/getBlogs'),
  postBlog = require('./decorators/postBlog'),
  updateBlog = require('./decorators/updateBlog'),
  deleteBlog = require('./decorators/deleteBlog'),
  getImg = require('./decorators/getImg'),
  postImg = require('./decorators/postImg'),
  deleteImage = require('./decorators/deleteImage')

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
app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/../build/index.html`)
})

getBlogs(app)
postBlog(app)
updateBlog(app)
deleteBlog(app)
getMsg(app)
sendMsg(app)
getImg(app)
postImg(app)
deleteImage(app)

const io = socket.listen(app.listen(process.env.SERVER_PORT, () => {
  console.log('wubba lubba dub dub!')
}))

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
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