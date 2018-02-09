import React, { Component } from 'react';
import { TextField, Button } from 'material-ui'
import axios from 'axios'
import Dropzone from 'react-dropzone'


class UploadImg extends Component {
  state = {
    image: '',
    imageName: '',
    fileURL: '',
    publicId: '',
    cols: 1,
  }

  onDrop = (image) => {
    this.setState({
      image,
    });
    console.log(this.state.image)
  }

  handleImageName = (event) => {
    this.setState({
      imageName: event.target.value,
    })
  }

  handleUpload = () => {
    console.log(this.state.image)
    let uploaders = this.state.image.map((image) => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', image);
      formData.append('tags', 'blogpictures');
      formData.append('upload_preset', 'efvqy0li'); // Replace the preset name with your own
      formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
      formData.append('timestamp', (Date.now() / 1000) | 0);
      return axios.post('https://api.cloudinary.com/v1_1/freakingjohnson/image/upload', formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      }).then((response) => {
        const { data } = response;
        const fileURL = data.secure_url // You should store this URL for future references in your app
        const publicId = data.public_id
        this.setState({
          fileURL,
          publicId,
        })
        console.log(this.state)
        axios.post('/api/postimg', {
          image: this.state.fileURL,
          title: this.state.imageName,
          publicId: this.state.publicId,
          cols: this.state.cols,
        }).then((res) => {
          console.log(res)
        }).catch((error) => {
          console.log(error)
        })
        console.log(data);
        this.setState({
          image: '',
          imageName: '',
          fileURL: '',
        })
      })
    })
  };


  render() {
    const {
      image,
    } = this.state
    console.log(image)
    return (
      <div>
        <div className="quill">
          <h1>Upload Image to Gallery</h1>
          <TextField
            primary="true"
            placeholder="Enter Image Name Here"
            label="Image Name"
            value={this.state.imageName}
            onChange={this.handleImageName}
          />
          <Dropzone
            onDrop={this.onDrop}
            name={this.state.imageName}
            multiple={false}
          >
            <p>drop file here</p>
          </Dropzone>
          {image ? <img src={image[0].preview} alt="" /> : undefined}
        </div>
        <Button
          variant="raised"
          onClick={this.handleUpload}
          color="primary"
        >
        Upload
        </Button>
      </div>
    )
  }
}

export default UploadImg