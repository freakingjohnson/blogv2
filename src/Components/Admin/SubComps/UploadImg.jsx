import React from 'react';
import { MenuItem, TextField, Button, withStyles, Select } from 'material-ui'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { change, drop, post, getImg } from '../../../ducks/subDucks/imgReducer'

const upload = (image, cols, rows, title, cb, cb2) => {
  image.map((image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('tags', 'blogpictures');
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY)
    formData.append('timestamp', (Date.now() / 1000) | 0);
    return axios.post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, formData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    }).then((response) => {
      const { secure_url, public_id } = response.data
      cb(title, cols, rows, secure_url, public_id)
      cb2()
    }).catch((err) => {
      console.log(err)
    })
  })
}

const UploadImg = ({
  classes, name, change, drop, cols, rows, image, post, getImg,
}) => (
  <div className={classes.root}>
    <div>
      <h3>Upload Image</h3>
      <TextField
        primary="true"
        placeholder="Enter Image Name Here"
        label="Image Name"
        name="name"
        value={name}
        onChange={e => change(e)}
      />
      <Select
        label="Columns"
        value={cols}
        onChange={change}
        name="cols"
        id="cols"
      >
        <MenuItem value={0}>Columns</MenuItem>
        <MenuItem value={1}>one</MenuItem>
        <MenuItem value={2}>two</MenuItem>
      </Select>
      <Select
        value={rows}
        onChange={change}
        name="rows"
        id="rows"
      >
        <MenuItem value={0}>Rows</MenuItem>
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
      onClick={() => upload(image, cols, rows, name, post, getImg)}
      color="primary"
      disabled={image.length === 0}
    >
        Upload
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
  name: state.imgReducer.name,
  cols: state.imgReducer.cols,
  rows: state.imgReducer.rows,
  image: state.imgReducer.image,
})

UploadImg.propTypes = {
  change: PropTypes.func.isRequired,
  drop: PropTypes.func.isRequired,
  post: PropTypes.func.isRequired,
  getImg: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  cols: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  image: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, {
  change, drop, post, getImg,
})(withStyles(styles)(UploadImg))