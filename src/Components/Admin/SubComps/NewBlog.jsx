import React from 'react'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, GridList, Typography, TextField, withStyles } from 'material-ui'
import { changeBody, changeTitle } from '../../../ducks/reducer'

const NewBlog = ({
  classes, modules, formats, body, title, changeBody, changeTitle,
}) => (
  <div className={classes.root}>
    <TextField
      label="Blog Title"
      type="text"
      onChange={changeTitle}
      value={title}
    />
    <ReactQuill
      value={body}
      modules={modules}
      formats={formats}
      placeholder="start typing..."
      onChange={changeBody}
    />
  </div>
)

const styles = {
  root: {
    width: '80%',
    position: 'relative',
    margin: 'auto',
    top: '5vh',
    background: 'white',
    boxShadow: '5px 10px 18px grey',
  },
}

NewBlog.propTypes = {
  modules: PropTypes.object.isRequired,
  formats: PropTypes.array.isRequired,
  body: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  changeBody: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  modules: state.modules,
  formats: state.formats,
  body: state.body,
  title: state.title,
})

export default connect(mapStateToProps, { changeBody, changeTitle })(withStyles(styles)(NewBlog))