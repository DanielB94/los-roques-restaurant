import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? 'https://www.losroquesrestaurant.com' : 'http://localhost:3200';

export const socket = io(URL, { autoConnect: false });