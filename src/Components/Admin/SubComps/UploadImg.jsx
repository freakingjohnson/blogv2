import React, { Component } from 'react';
import { MenuItem, TextField, Button, withStyles, Select } from 'material-ui'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { change, drop, changeState, reset } from '../../../ducks/subDucks/imgReducer'

class UploadImg extends Component {
  // state = {
  //   image: '',
  //   secure_url: '',
  //   public_id: '',
  //   cols: 2,
  // }

   handleUpload = (props) => {
     const {
       image, changeState, name, cols, reset,
     } = props
     image && image.map((image) => {
       const formData = new FormData();
       formData.append('file', image);
       formData.append('tags', 'blogpictures');
       formData.append('upload_preset', 'efvqy0li')
       formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY)
       formData.append('timestamp', (Date.now() / 1000) | 0)
       axios.post('https://api.cloudinary.com/v1_1/freakingjohnson/image/upload', formData, {
         headers: { 'X-Requested-With': 'XMLHttpRequest' },
       }).then(async (response) => {
         await changeState(response.data)
         this.handlePost(name, response.data, cols, reset)
       })
     })
   }

    handlePost = (name, response, cols, reset) => {
      const { secure_url, public_id } = response
      axios.post('/api/postimg', {
        image: secure_url,
        title: name,
        public_id,
        cols,
      }).then((res) => {
        console.log(res)
        reset()
      }).catch((error) => {
        console.log(error)
      })
    }

    render() {
      const {
        classes, name, change, drop, cols, image,
      } = this.props
      return (
        <div className={classes.root}>
          <div>
            <h1>Upload Image to Gallery</h1>
            <TextField
              primary="true"
              placeholder="Enter Image Name Here"
              label="Image Name"
              name="name"
              value={name}
              onChange={e => change(e)}
            />
            <Select
              value={cols}
              onChange={change}
              name="cols"
            >
              <MenuItem value={1}>one</MenuItem>
              <MenuItem value={2}>two</MenuItem>
            </Select>
            <Dropzone
              onDrop={drop}
              name={name}
              multiple={false}
            >
              {image.length > 0 ? <img src={image[0].preview} alt="" /> : <p>drop file here</p>}
            </Dropzone>
          </div>
          <Button
            variant="raised"
            onClick={() => this.handleUpload(this.props)}
            color="primary"
          >
        Upload
          </Button>
          {this.uploaders}
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
  name: state.imgReducer.name,
  cols: state.imgReducer.cols,
  image: state.imgReducer.image,
})

UploadImg.propTypes = {
  change: PropTypes.func.isRequired,
  drop: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  cols: PropTypes.number.isRequired,
  image: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, {
  change, drop, changeState, reset,
})(withStyles(styles)(UploadImg))