import React from 'react'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, TextField, withStyles } from 'material-ui'
import { changeNewBody, changeTitle, updateBlog, setBlog, getBlogs } from '../../../ducks/subDucks/blogReducer'

const EditBlog = ({
  classes,
  modules,
  formats,
  newBody,
  newTitle,
  changeNewBody,
  changeTitle,
  updateBlog,
  getBlogs,
  id,
}) => (
  <div className={classes.root}>
    <TextField
      label="Blog Title"
      type="text"
      name="newTitle"
      onChange={e => changeTitle(e)}
      value={newTitle}
    />
    <ReactQuill
      value={newBody}
      name="newBody"
      modules={modules}
      formats={formats}
      placeholder="start typing..."
      onChange={changeNewBody}
    />
    <Button
      variant="raised"
      color="primary"
      disabled={!newBody || !newTitle}
      onClick={() => updateBlog(newTitle, newBody, id, getBlogs)}
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
    marginTop: '10px',
    background: 'white',
    boxShadow: '5px 10px 18px grey',
  },
}

const mapStateToProps = state => ({
  modules: state.blogReducer.modules,
  formats: state.blogReducer.formats,
  newBody: state.blogReducer.newBody,
  newTitle: state.blogReducer.newTitle,
  blogData: state.blogReducer.blogData,
  id: state.blogReducer.id,
})

EditBlog.propTypes = {
  modules: PropTypes.object.isRequired,
  formats: PropTypes.array.isRequired,
  newBody: PropTypes.string.isRequired,
  newTitle: PropTypes.string.isRequired,
  changeNewBody: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  setBlog: PropTypes.func.isRequired,
  getBlogs: PropTypes.func.isRequired,
  blogData: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
}

export default connect(mapStateToProps, {
  changeNewBody, changeTitle, updateBlog, setBlog, getBlogs,
})(withStyles(styles)(EditBlog))