import React from 'react';
import PropType from 'prop-types'
import { withStyles } from 'material-ui'
import picture from '../../../assets/background1.mp4'

const styles = {
  picture: {
    maxHeight: '300px',
    margin: 'auto',
    width: '100%',
    objectFit: 'cover',
  },
}

const SlideTwo = ({ classes }) => (
  <div>
    <video autoPlay loop src={picture} className={classes.picture} muted />
    <p className="legend">Legend 1</p>
  </div>
)

SlideTwo.propTypes = {
  classes: PropType.object.isRequired,
}

export default withStyles(styles)(SlideTwo);