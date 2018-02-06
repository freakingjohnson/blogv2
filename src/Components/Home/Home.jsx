import React from 'react'
import { Card, CardContent, CardHeader, withStyles } from 'material-ui'
import PropTypes from 'prop-types'
import { Carousel } from 'react-responsive-carousel'
import SlideOne from './Slider/SlideOne'
import SlideTwo from './Slider/SlideTwo'
import SlideThree from './Slider/SlideThree'

require('react-responsive-carousel/lib/styles/carousel.min.css')

const Home = ({ classes }) => (
  <div className={classes.root}>
    <Card>
      <CardHeader title="Welcome" className={classes.welcome} />
      <CardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardContent>
    </Card>
    <Carousel
      infiniteLoop
      autoPlay
      showThumbs={false}
      showArrows={false}
      showStatus={false}
      stopOnHover={false}
    >
      <SlideOne />
      <SlideTwo />
      <SlideThree />
    </Carousel>
  </div>
)

const styles = {
  root: {
    width: '80%',
    position: 'relative',
    margin: 'auto',
    top: '5vh',
  },
  welcome: {
    top: '30px',
    opacity: '0.5',
    position: 'inherit',
    fontSize: '56px',
    margin: 'auto',
    width: 'auto',
    padding: '10px',
    textAlign: 'center',
  },
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)