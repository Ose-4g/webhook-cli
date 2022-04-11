const axios = require('axios');
const chalk = require('chalk');
const { REMOTE_URL } = require('./constants');

const getRemoteUrl = async (email) => {
  try {
    const { data } = await axios.get(`${REMOTE_URL}/api/v1/get-url?email=${email}`);

    process.stdout.write('Your remote webhook is located at ');
    console.log(chalk.blue.bold(`${data.url}`));

    return true;
  } catch {
    return false;
  }
};

module.exports = getRemoteUrl;
