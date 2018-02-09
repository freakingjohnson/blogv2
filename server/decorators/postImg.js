const postImg = (req, res) => {
  const db = req.app.get('db')
  console.log(req.body)
  db.post_image([req.body.image, req.body.title, req.body.publicId, req.body.cols])
    .then(() => res.status(200).send())
    .catch(err =>
      res.status(500).send(err))
}

module.exports = (app) => {
  app.post('/api/postimg', postImg)
}