import React from 'react'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, TextField, withStyles } from 'material-ui'
import { changeNewBody, changeTitle, updateBlog, setBlog, getBlogs, deleteBlog, changeIndex } from '../../../ducks/subDucks/blogReducer'

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
  deleteBlog,
  changeIndex,
  index,
  length,
  id,
}) => (
  <div className={classes.root}>
    <TextField
      value={newTitle ? newTitle : 'just a moment...'}
      label="Blog Title"
      type="text"
      name="newTitle"
      onChange={e => changeTitle(e)}
    />
    <ReactQuill
      value={newBody ? newBody : 'Loading... hang on'}
      name="newBody"
      modules={modules}
      formats={formats}
      placeholder="start typing..."
      onChange={changeNewBody}
    />
    <Button
      className={classes.prev}
      variant="raised"
      color="primary"
      disabled={index === length - 1}
      onClick={() => changeIndex(index, 1)}
    >
      {'< prev'}
    </Button>
    <Button
      className={classes.next}
      variant="raised"
      color="primary"
      disabled={index === 0}
      onClick={() => changeIndex(index, -1)}
    >
      {'next >'}
    </Button>
    <Button
      className={classes.update}
      variant="raised"
      color="secondary"
      disabled={!newBody || !newTitle}
      onClick={() => updateBlog(newTitle, newBody, id, getBlogs)}
    >
        Update
    </Button>
    <Button
      className={classes.delete}
      variant="raised"
      color="secondary"
      disabled={!newBody || !newTitle}
      onClick={() => deleteBlog(id, getBlogs)}
    >
        delete
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
  delete: {
    marginLeft: '17px',
  },
  next: {
    float: 'right',
  },
  update: {
    float: 'right',
    marginRight: '17px',
  },
}

const mapStateToProps = state => ({
  modules: state.blogReducer.modules,
  formats: state.blogReducer.formats,
  newBody: state.blogReducer.newBody,
  newTitle: state.blogReducer.newTitle,
  length: state.blogReducer.length,
  index: state.blogReducer.index,
  id: state.blogReducer.id,
})

EditBlog.propTypes = {
  modules: PropTypes.object.isRequired,
  formats: PropTypes.array.isRequired,
  length: PropTypes.number.isRequired,
  newBody: PropTypes.string.isRequired,
  newTitle: PropTypes.string.isRequired,
  changeNewBody: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  changeIndex: PropTypes.func.isRequired,
  getBlogs: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
}

export default connect(mapStateToProps, {
  changeNewBody, changeTitle, updateBlog, setBlog, getBlogs, deleteBlog, changeIndex,
})(withStyles(styles)(EditBlog))