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
        <p>
          This is a blog app created as a personal project by Nathan Johnson.
        </p>
        <p>
          The original project was made at DevMountain around halfway through the 12 weeks.
          Source code for both can be found on my <a href="https://github.com/freakingjohnson">GitHub page</a>
        </p>
        <p>
          If you are checking things out go ahead and play around but delete anything in admin you upload please! thank you.
        </p>
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