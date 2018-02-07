const getMsg = (req, res) => {
  const db = req.app.get('db')
  const params = req
  //   console.log(params)
  db.get_msg([params.id])
    .then(body => res.status(200).send(body))
    .catch((error) => {
      console.log(error)
      res.status(500).send()
    })
}
module.exports = (app) => {
  app.get('/api/getmsg', getMsg)
}