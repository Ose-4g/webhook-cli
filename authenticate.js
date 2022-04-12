const axios = require('axios');
const chalk = require('chalk');
const { REMOTE_URL } = require('./constants');

exports.authenticate = async (code, password) => {
  try {
    await axios.post(`${REMOTE_URL}/api/v1/authenticate`, { code, password });
    return true;
  } catch (error) {
    if (error.response) {
      console.log(chalk.red(error.response.data.message));
    } else {
      console.log('an error occured. Check your internet connection ans ensure that your password is correct');
    }
    return false;
  }
};
