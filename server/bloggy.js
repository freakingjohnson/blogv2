require('dotenv').config()
const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  session = require('express-session'),
  massive = require('massive')

const app = express();
app.use(cors())
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }))

massive(process.env.DB_CONNECTION).then((db) => {
  app.set('db', db)
})

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

app.use(express.static(`${__dirname}/../build`))

app.listen(process.env.SERVER_PORT, () => { console.log('wubba lubba dub dub!') })