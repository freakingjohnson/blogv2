import React, { Component } from 'react'
import { withStyles, Reboot } from 'material-ui'
import PropTypes from 'prop-types'
import router from './router/router'
import NavBar from './Components/NavBar/NavBar'

const back = require('./assets/back.png')

class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  state = {}
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

export default withStyles(styles)(App);
