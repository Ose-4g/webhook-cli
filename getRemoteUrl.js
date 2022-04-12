const axios = require('axios');
const chalk = require('chalk');
const { REMOTE_URL } = require('./constants');

/**
 * Gets a new remote webhook url
 * @param password: password to use to get a new code
 * @returns nothing. Prints the new url to the console
 */
const getRemoteUrl = async (password) => {
  try {
    console.log('fetching your remote url.......');
    const { data } = await axios.post(`${REMOTE_URL}/api/v1/get-url`, { password });

    process.stdout.write('Your remote webhook is located at ');
    console.log(chalk.blue.bold(`${data.url}`));

    return true;
  } catch {
    return false;
  }
};

module.exports = getRemoteUrl;
