import React from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles, Reboot } from 'material-ui'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import router from './router/router'
import NavBar from './Components/NavBar/NavBar'
import { getImg } from './ducks/subDucks/imgReducer'
import { getBlogs, setBlog } from './ducks/subDucks/blogReducer'


const back = require('./assets/back.png')

class App extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    getImg: PropTypes.func.isRequired,
    getBlogs: PropTypes.func.isRequired,
    setBlog: PropTypes.func.isRequired,
    blogData: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
  }

  componentDidMount = () => {
    const { getImg, getBlogs } = this.props
    getImg()
    getBlogs()
  }

  componentDidUpdate = () => {
    const { setBlog, blogData, index } = this.props
    setBlog(blogData, index)
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Reboot />
        <NavBar />
        {router}
      </div>
    )
  }
}

const styles = {
  root: {
    fontFamily: 'Roboto',
    height: 'auto',
    minHeight: '100vh',
    paddingBottom: '60px',
    backgroundImage: `url(${back})`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'repeat',
    backgroundSize: 'cover',
  },
}

const mapStateToProps = state => ({
  blogData: state.blogReducer.blogData,
  index: state.blogReducer.index,
})

export default withRouter(connect(mapStateToProps, { getImg, getBlogs, setBlog })(withStyles(styles)(App)))