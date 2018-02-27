import React, { Component } from 'react'
import { withStyles, Reboot } from 'material-ui'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import router from './router/router'
import NavBar from './Components/NavBar/NavBar'
import { getImg } from './ducks/subDucks/imgReducer'
import { getBlogs } from './ducks/subDucks/blogReducer'


const back = require('./assets/back.png')

class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    getImg: PropTypes.func.isRequired,
    getBlogs: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    const { getImg, getBlogs } = this.props
    getImg()
    getBlogs()
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Reboot />
        <NavBar />
        {router}
      </div>
    );
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

const mapStateToProps = state => state

export default connect(mapStateToProps, { getImg, getBlogs })(withStyles(styles)(App))