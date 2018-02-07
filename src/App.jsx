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
    height: '100vh',
    backgroundAttachment: 'fixed',
    backgroundImage: `url(${back})`,
    backgroundRepeat: 'repeat',
    paddingBottom: '120vh',
  },
}

export default withStyles(styles)(App);
