const sendMsg = (req, res) => {
  const db = req.app.get('db')
  db.send_msg([req.body.name, req.body.body, req.body.date])
    .then(res => res.status(200).send())
    .catch((err) => {
      res.status(500).send()
    })
}
module.exports = (app) => {
  app.post('/api/sendmsg', sendMsg)
}