import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui'
import io from 'socket.io-client'
import subscribeToTimer from './api'

const socket = io()


class Discussion extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  constructor() {
    super()
    this.state = {
      chat: [
        {
          messages: [],
          connected: true,
        },
      ],
      name: '',
      message: '',
      // history: [],
      timestamp: 'no timestamp',
    }

    subscribeToTimer((err, timestamp) => this.setState({
      timestamp,
    }))
    socket.on('generate response', (data) => {
      let chatArr = this.state.chat
      chatArr[0].messages.push({
        message: data.message,
        name: data.name,
        time: data.time,
      })
      this.setState({ chat: chatArr })
      console.log(chatArr)
    })
  }

  sendMessage = () => {
    socket.emit('send message', {
      name: this.state.name,
      message: this.state.message,
      time: this.state.timestamp,
    })
    this.setState({ message: '' })
    // console.log(this.state)
  }

  changeMessage = (e) => {
    this.setState({ message: e.target.value })
  }

  changeName = (e) => {
    this.setState({ name: e.target.value })
  }

  render() {
    const {
      classes,
    } = this.props
    const {
      name,
      message,
      timestamp,
    } = this.state
    const chatRoom = this.state.chat.map(body => (
      <section className="" key="0">
        <div className="">
          {/* below is what will be message card */}
          { body.messages.map((message, index) =>
            <p key={index}>{message.name} { message.message } {message.time}</p>) }
        </div>

        <div className="">
          <button
            className=""
            onClick={this.sendMessage}
          >
          Send Message
          </button>
        </div>
      </section>
    ))
    return (
      <div className={classes.root}>
        {chatRoom}
        <input
          type="text"
          placeholder="Type name"
          onChange={this.changeName}
          value={name}
        />
        <input
          className=""
          type="text"
          placeholder="Type message..."
          onChange={this.changeMessage}
          value={message}
        />
        <p className={classes.time}>
      This is the timer value: {timestamp}
        </p>
      </div>
    );
  }
}

const styles = {
  root: {
    width: '100%',
    color: 'white',
  },
  time: {
    color: 'white',
  },
}

export default withStyles(styles)(Discussion)