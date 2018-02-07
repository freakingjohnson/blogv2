const sendMsg = (req, res, next) => {
  const db = req.app.get('db')
  db.send_msg([req.body.name, req.body.body, req.body.date])
    .then(response => res.status(200).send())
    .catch((error) => {
      res.status(500).send()
    })
}
module.exports = (app) => {
  app.post('/api/sendmsg', sendMsg)
}