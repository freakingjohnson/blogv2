import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cloudinary from 'cloudinary'
import axios from 'axios'
import { Button, withStyles } from 'material-ui'
import { getImg } from '../../../ducks/subDucks/imgReducer'

class DeleteImg extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    imageData: PropTypes.array.isRequired,
    getImg: PropTypes.func.isRequired,
  }
  state = {
    index: 0,
  }

  delete = () => {
    const { getImg, imageData } = this.props
    const { index } = this.state
    axios.delete(`/api/delete/${imageData[index].id}`).then((res) => {
      cloudinary.v2.uploader.destroy(
        imageData[index].public_id,
        {
          api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
          api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
          cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        },
        (error, result) => {
          error ? console.log(error) : result ? console.log(result) : undefined
        },
      )
      console.log(res)
      getImg()
    }).catch((error) => {
      console.log(error)
    })
  }

  next = () => {
    this.setState({
      index: this.state.index - 1,
    })
    this.props.getImg()
  }

  prev = () => {
    this.setState({
      index: this.state.index + 1,
    })
    this.props.getImg()
  }

  render() {
    const { classes, imageData } = this.props
    const {
      index,
    } = this.state
    return (
      imageData.length > 0 &&
      <div className={classes.root}>
        <p>Delete Image</p>
        <img src={imageData[index].img} alt="" />
        <Button
          variant="raised"
          color="primary"
          disabled={index === imageData.length - 1}
          onClick={this.prev}
        >
          Prev
        </Button>
        <Button
          variant="raised"
          color="primary"
          disabled={index === 0}
          onClick={this.next}
        >
          Next
        </Button>
        <Button
          variant="raised"
          color="secondary"
          disabled={!imageData}
          onClick={this.delete}
        >
          Delete
        </Button>
      </div>
    )
  }
}
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
})

DeleteImg.propTypes = {
  classes: PropTypes.object.isRequired,
  imageData: PropTypes.array.isRequired,
  getImg: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { getImg })(withStyles(styles)(DeleteImg))