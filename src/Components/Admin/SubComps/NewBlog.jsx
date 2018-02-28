import React from 'react'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, TextField, withStyles } from 'material-ui'
import { changeBody, changeTitle, postBlog, getBlogs } from '../../../ducks/subDucks/blogReducer'

const NewBlog = ({
  classes, modules, formats, body, title, changeBody, changeTitle, postBlog, getBlogs,
}) => (
  <div className={classes.root}>
    <TextField
      label="Blog Title"
      type="text"
      name="title"
      onChange={e => changeTitle(e)}
      value={title}
    />
    <ReactQuill
      value={body}
      name="body"
      modules={modules}
      formats={formats}
      placeholder="start typing..."
      onChange={changeBody}
    />
    <Button
      variant="raised"
      color="primary"
      disabled={!body || !title}
      onClick={() => postBlog(title, body, getBlogs)}
    >
    Post
    </Button>
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

const mapStateToProps = state => ({
  modules: state.blogReducer.modules,
  formats: state.blogReducer.formats,
  body: state.blogReducer.body,
  title: state.blogReducer.title,
})

NewBlog.propTypes = {
  modules: PropTypes.object.isRequired,
  formats: PropTypes.array.isRequired,
  body: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  changeBody: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  postBlog: PropTypes.func.isRequired,
  getBlogs: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, {
  changeBody, changeTitle, postBlog, getBlogs,
})(withStyles(styles)(NewBlog))