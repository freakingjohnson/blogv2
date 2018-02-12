import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import { Button, Typography, GridList, withStyles } from 'material-ui';

const createDOMPurify = require('dompurify'),
  DOMPurify = createDOMPurify(window)

class Blog extends React.Component {
    static propTypes = {
      classes: PropTypes.object.isRequired,
    }
  state = {
    blogData: undefined,
    index: 0,
    length: undefined,
  }

  componentDidMount() {
    axios.get('/api/blogs')
      .then((res) => {
        this.setState({
          blogData: res.data,
          length: res.data.length,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
    handleNext = () =>
      this.setState({
        index: this.state.index - 1,
      })
    handlePrevious = () =>
      this.setState({
        index: this.state.index + 1,
      })
    render() {
      const {
        blogData, index, length,
      } = this.state
      const { classes } = this.props
      const clean = blogData && DOMPurify.sanitize(blogData[index].body)
      return (
        <div className={classes.root}>
          {
              blogData &&
              <GridList cols={1} cellHeight="auto" className={classes.container}>
                <Typography variant="headline" align="center">
                  {blogData[index].title}
                </Typography>
                <Typography variant="caption" align="right">
                  {blogData[index].post_date}
                </Typography>
                {<Typography component="p" dangerouslySetInnerHTML={{ __html: clean }} />}
              </GridList>
          }
          <Button
            color="primary"
            variant="raised"
            onClick={this.handlePrevious}
            disabled={index === length - 1}
          >
                Prev
          </Button>
          <Button
            color="primary"
            className={classes.next}
            variant="raised"
            onClick={this.handleNext}
            disabled={index === 0}
          >
                Next
          </Button>
        </div>
      )
    }
}
const styles = {
  root: {
    width: '90%',
    position: 'relative',
    margin: 'auto',
    top: '5vh',
  },
  next: {
    float: 'right',
  },
  container: {
    height: '75vh',
    width: '100%',
    margin: '0',
    background: 'white',
  },
}
export default withStyles(styles)(Blog)