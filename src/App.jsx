import React, { Component } from 'react'
import { withStyles } from 'material-ui'
import PropTypes from 'prop-types'
import router from './router/router'
import NavBar from './Components/NavBar/NavBar'

class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  state = {}
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <NavBar />
        {router}
      </div>
    );
  }
}

const styles = {
  root: {
    fontFamily: 'Roboto',
    background: 'black',
    height: '100vh',
  },
}

export default withStyles(styles)(App);
