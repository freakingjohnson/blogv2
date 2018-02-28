import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import cloudinary from 'cloudinary'
import axios from 'axios'
import { Button, withStyles } from 'material-ui'
import { getImg, changeImageIndex, reset } from '../../../ducks/subDucks/imgReducer'

const deleteImage = (imageData, imageIndex, cb) => {
  const destroyer = () => cloudinary.v2.uploader.destroy(
    imageData[imageIndex].public_id,
    {
      api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
      api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    },
  )
  axios.delete(`/api/delete/${imageData[imageIndex].id}`).then(() => {
    destroyer()
    cb()
  })
}

const DeleteImg = ({
  classes, imageData, changeImageIndex, imageIndex, getImg,
}) => (
  imageData.length > 0 &&
  <div className={classes.root}>
    <h3>Delete Image</h3>
    <img src={imageData[imageIndex].img} alt="" />
    <Button
      variant="raised"
      color="primary"
      disabled={imageIndex === imageData.length - 1}
      onClick={() => changeImageIndex(imageIndex, 1)}
    >
          Prev
    </Button>
    <Button
      variant="raised"
      color="primary"
      disabled={imageIndex === 0}
      onClick={() => changeImageIndex(imageIndex, -1)}
    >
          Next
    </Button>
    <Button
      variant="raised"
      color="secondary"
      disabled={!imageData}
      onClick={() => deleteImage(imageData, imageIndex, getImg)}
    >
          Delete
    </Button>
  </div>
)

const styles = {
  root: {
    width: '40%',
    position: 'relative',
    margin: 'auto auto auto 10%',
    top: '5vh',
    background: 'white',
    boxShadow: '5px 10px 18px grey',
  },
}

const mapStateToProps = state => ({
  imageData: state.imgReducer.imageData,
  imageIndex: state.imgReducer.imageIndex,
})

DeleteImg.propTypes = {
  classes: PropTypes.object.isRequired,
  imageData: PropTypes.array.isRequired,
  getImg: PropTypes.func.isRequired,
  imageIndex: PropTypes.number.isRequired,
  changeImageIndex: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

export default withRouter(connect(mapStateToProps, { getImg, changeImageIndex, reset })(withStyles(styles)(DeleteImg)))