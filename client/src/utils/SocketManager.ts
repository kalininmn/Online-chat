import { Manager } from 'socket.io-client';
import env from '../consts/env';

const manager = new Manager(env.HOST);
const socket = manager.socket('/');

// Fired upon a connection error.
socket.io.on('error', (error) => {
  console.log({ socket_error: error });
});

// Fired upon a successful reconnection.
socket.io.on('reconnect', (attempt) => {
  console.log({ socket_reconnect: 'successful' });
});

// Fired upon an attempt to reconnect.
socket.io.on('reconnect_attempt', (attempt) => {
  console.log({ socket_reconnect: 'reconnecting' });
});

// Fired when couldn't reconnect within reconnectionAttempts.
socket.io.on('reconnect_failed', () => {
  console.log({ socket_reconnect: 'failed' });
});

export default socket;
