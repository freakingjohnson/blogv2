import React from 'react'
import PropTypes from 'prop-types';
import { Drawer, withStyles, AppBar, Toolbar, IconButton } from 'material-ui';
import { Menu } from 'material-ui-icons'
import MenuItems from './MenuItems'

class NavBar extends React.Component {
    static propTypes = {
      classes: PropTypes.object.isRequired,
    }
    state = {
      open: false,
    }

    toggleDrawer = () => this.setState({ open: !this.state.open })

    handleClose = () => this.setState({ open: false })

    render() {
      const { classes } = this.props
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar className={classes.toolBar}>
              <h1 className={classes.title}>BloggyBlogBlog</h1>
              <IconButton onClick={this.toggleDrawer} className={classes.left}>
                <Menu className={classes.menu} />
              </IconButton>
              <Drawer
                className={classes.list}
                open={this.state.open}
                onClose={this.toggleDrawer}
              >
                <MenuItems handleClose={this.handleClose} />
              </Drawer>
            </Toolbar>
          </AppBar>
        </div>
      )
    }
}

const styles = {
  root: {
    width: '100%',
    display: 'flex',
    marginBottom: '0px',
  },
  list: {
    width: '200px',
  },
  left: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  toolBar: {
    paddingLeft: '0',
    paddingRight: '0',
    height: '0',
    fontSize: '0.5em',
    justifyContent: 'left',
  },
  menu: {
    fontSize: '32px',
    color: '#706b66',
  },
  title: {
    marginLeft: '40px',
  },
};

export default withStyles(styles)(NavBar)