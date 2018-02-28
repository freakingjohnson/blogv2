const deleteImage = (req, res) => {
  const db = req.app.get('db')
  const { params } = req
  db.delete_image([params.id])
    .then(() => res.status(200).send())
    .catch((error) => {
      console.log(error)
      res.status(500).send()
    })
}

module.exports = (app) => {
  app.delete('/api/delete/:id', deleteImage)
}