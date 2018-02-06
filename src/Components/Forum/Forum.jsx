import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui';

class Forum extends React.Component {
    static propTypes = {
      classes: PropTypes.object.isRequired,
    }
    state={

    }
    render() {
      const {
        classes,
      } = this.props
      return (
        <div className={classes.root}>
              forum goes here
        </div>
      )
    }
}

const styles = {
  root: {
    width: '100%',
  },
}

export default withStyles(styles)(Forum)