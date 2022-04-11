const { io } = require('socket.io-client');
const chalk = require('chalk');
const forwardRequest = require('./forwardRequest');
const URL = require('url').URL;
const { REMOTE_URL } = require('./constants');

const connect = async (url, port, path) => {
  const socket = io(REMOTE_URL);
  const parsedUrl = new URL(url);
  const [, code] = parsedUrl.pathname.split('/');
  console.log('code = ', code);
  socket.on('connect', () => {
    process.stdout.write('connected to ');
    console.log(chalk.blue.bold(`${REMOTE_URL}`));
  });

  const localurl = `http://localhost:${port}${path}`;
  console.log('forwarding requests');
  console.log(`${chalk.blue(url)} ====================> ${chalk.blue.bold(localurl)}`);
  socket.on('disconnect', () => {
    console.log(chalk.red.bold(`disconnected from ${REMOTE_URL}`));
  });

  socket.on(code, (data) => {
    const { method, headers, query, body, originalUrl } = data;
    forwardRequest({ method, headers, query, body }, localurl);
    console.log(`${method} ${localurl}${originalUrl}`);
  });
};

module.exports = connect;
