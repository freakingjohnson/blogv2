import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem, ListItemText, withStyles, ListItemIcon, Divider } from 'material-ui'
import { Link } from 'react-router-dom'
import { Home, Description, QuestionAnswer, PhotoLibrary } from 'material-ui-icons'

const MenuItems = ({ handleClose, classes }) => (
  <div className={classes.list}>
    <List>
      <ListItem className={classes.listItem} button component={Link} to="/" onClick={handleClose}>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText className={classes.listText} primary="Home" />
      </ListItem>
      <Divider />
      <ListItem className={classes.listItem} button component={Link} to="/blog" onClick={handleClose}>
        <ListItemIcon>
          <Description />
        </ListItemIcon>
        <ListItemText className={classes.listText} primary="Blog" />
      </ListItem>
      <Divider />
      <ListItem className={classes.listItem} button component={Link} to="/discussion" onClick={handleClose}>
        <ListItemIcon>
          <QuestionAnswer />
        </ListItemIcon>
        <ListItemText className={classes.listText} primary="Discussion" />
      </ListItem>
      <Divider />
      <ListItem className={classes.listItem} button component={Link} to="/gallery" onClick={handleClose}>
        <ListItemIcon>
          <PhotoLibrary />
        </ListItemIcon>
        <ListItemText className={classes.listText} primary="Gallery" />
      </ListItem>
    </List>
  </div>
)

const styles = {
  listItem: {
    margin: '10px 0',
  },
  listText: {
    fontSize: '20px',
    color: '#706b66',
  },
};

MenuItems.propTypes = {
  handleClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MenuItems)