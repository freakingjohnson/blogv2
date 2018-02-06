import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import { Button, Card, CardContent, CardHeader, Typography, withStyles } from 'material-ui';

const createDOMPurify = require('dompurify');

const DOMPurify = createDOMPurify(window);

class Blog extends React.Component {
    static propTypes = {
      classes: PropTypes.object.isRequired,
    }
    constructor() {
      super()
      this.state = {
        blogData: undefined,
        index: 0,
        length: undefined,
      }
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
      //   blogData ? console.log(blogData) : console.log('fag')
      return (
        <div className={classes.root}>
          {
              blogData &&
              <Card>
                <CardHeader
                  title={blogData[index].title}
                  subheader={blogData[index].post_date}
                />
                <CardContent>
                  {<Typography component="p" dangerouslySetInnerHTML={{ __html: clean }} />}
                </CardContent>
              </Card>
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
    width: '80%',
    position: 'relative',
    margin: 'auto',
    top: '5vh',
  },
  next: {
    float: 'right',
    marginBottom: '10px',
  },
}

export default withStyles(styles)(Blog)