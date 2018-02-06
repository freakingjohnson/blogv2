const getBlogs = (req, res) => {
  const db = req.app.get('db')
  const params = req

  db.get_blogs([params.id])
    .then(body => res.status(200).send(body))
    .catch((error) => {
      console.log(error)
      res.status(500).send()
    })
}
module.exports = (app) => {
  app.get('/api/blogs', getBlogs)
}