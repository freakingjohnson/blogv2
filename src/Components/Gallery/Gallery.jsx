import React from 'react'
import PropTypes from 'prop-types'
import Lightbox from 'react-image-lightbox'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles, GridList, GridListTile } from 'material-ui'


class Gallery extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    imageData: PropTypes.array.isRequired,
  }
  state = {
    isOpen: false,
    imageSrc: '',
  }

  handleLightbox = (img) => {
    this.setState({
      isOpen: true,
      imageSrc: img,
    })
  }

  render() {
    const { classes, imageData } = this.props
    const {
      isOpen,
      imageSrc,
    } = this.state
    return (
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {
            imageData && imageData.map(tile => (
              <GridListTile
                onClick={() => this.handleLightbox(tile.img)}
                key={tile.id}
                cols={tile.cols}
                rows={tile.image_row}
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

const mapStateToProps = state => ({
  imageData: state.imgReducer.imageData,
})

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Gallery)))