const postBlog = (req, res) => {
  const db = req.app.get('db')
  // console.log(req.body)
  db.post_blog([req.body.title, req.body.body, req.body.date])
    .then(() => res.status(200).send())
    .catch(err =>
      res.status(500).send(err))
}

module.exports = (app) => {
  app.post('/api/postblog', postBlog)
}