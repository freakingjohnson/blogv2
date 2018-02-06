import React from 'react';
import PropType from 'prop-types'
import { withStyles } from 'material-ui'
import picture from '../../../assets/author.jpg'

const styles = {
  picture: {
    maxHeight: '300px',
    margin: 'auto',
    width: '100%',
    objectFit: 'cover',
  },
}

const SlideOne = ({ classes }) => (
  <div>
    <img src={picture} className={classes.picture} alt="" />
    <p className="legend">Legend 1</p>
  </div>
)

SlideOne.propTypes = {
  classes: PropType.object.isRequired,
}
export default withStyles(styles)(SlideOne);