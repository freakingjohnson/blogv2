const updateBlog = (req, res) => {
  const db = req.app.get('db')
  console.log(req.body)
  db.update_blog([req.body.title, req.body.body, req.body.id])
    .then((res) => {
      console.log(res)
      // res.status(200).send()
    }).catch((error) => {
      console.log(error)
      res.status(500).send()
    })
}
module.exports = (app) => {
  app.put('/api/updateblog', updateBlog)
}