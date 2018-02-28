import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:3006')

export const subscribeToTimer = (cb) => {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

export const unsubscribeFromTimer = () => {
  socket.removeAllListeners('timer')
}