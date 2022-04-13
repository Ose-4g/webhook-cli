const axios = require('axios');
const chalk = require('chalk');

/**
 *
 * @param {
 *  method: GET, POST, DELETE etc.
 *  headers: all headers
 *  query: all queries
 *  body: The body of the request
 * } param0
 * @param {*} localurl : local url we're forwarding requests to.
 */
const forwardRequest = async ({ method, headers, query, body }, localurl) => {
  try {
    await axios({
      method,
      url: localurl,
      data: body,
      params: { ...query },
      headers,
    });
  } catch (error) {
    console.log(chalk.red('An error occured. Ensure the server is running on the port you speicified'));
  }
};

module.exports = forwardRequest;
