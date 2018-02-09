import React from 'react'
import PropTypes from 'prop-types'
import Lightbox from 'react-image-lightbox'
import { withStyles, GridList, GridListTile } from 'material-ui'
import axios from 'axios'

class Gallery extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  constructor() {
    super()
    this.state = {
      imageData: undefined,
      isOpen: false,
      imageSrc: '',
    }
  }

  componentDidMount = () => {
    axios.get('/api/getimg')
      .then((res) => {
        this.setState({
          imageData: res.data,
        })
        // console.log(this.state.imageData)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleClick = (img) => {
    this.setState({
      isOpen: true,
      imageSrc: img,
    })
  }

  render() {
    const { classes } = this.props
    const {
      isOpen,
      imageData,
      imageSrc,
    } = this.state
    return (
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {
            imageData && imageData.map(tile => (
              <GridListTile
                onClick={_ => this.handleClick(tile.img)}
                key={tile.id}
                cols={tile.cols}
              >
                <img src={tile.img} alt={tile.title} />
              </GridListTile>
            ))
          }
        </GridList>
        {
          isOpen &&
          <Lightbox
            mainSrc={imageSrc}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        }
      </div>
    )
  }
}

const styles = {
  root: {
    margin: 'auto',
    width: '80%',
    position: 'relative',
    top: '5vh',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: 700,
    height: 490,
    margin: '5px',
  },
  subheader: {
    width: '100%',
  },
}

export default withStyles(styles)(Gallery)