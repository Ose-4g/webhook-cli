const { io } = require('socket.io-client');
const chalk = require('chalk');
const forwardRequest = require('./forwardRequest');
const URL = require('url').URL;
const { REMOTE_URL } = require('./constants');
const { authenticate } = require('./authenticate');

/**
 * - authenticates user using code and password
 * - receives requests from the remote webhook via socket.io
 * - forwards those requests to the localhost server.
 *
 * @param {*} pass : password the user entered
 * @param {*} url : url of the remote webhook
 * @param {*} port : port which we're forwarding the request to on localhost
 * @param {*} path : path to which we're forwarding the request to on the localhost port
 * @returns :
 */
const connect = async (pass, url, port, path) => {
  const parsedUrl = new URL(url);
  const [, code] = parsedUrl.pathname.split('/');

  const authenticated = await authenticate(code, pass);

  if (!authenticated) {
    console.log(chalk.red('Unable to authenticate you'));
    return;
  }
  const socket = io(REMOTE_URL);
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
    console.log(`url = ${method} ${localurl}`, `query = ${JSON.stringify(query)}`, `body = ${JSON.stringify(body)}`);
  });
};

module.exports = connect;
