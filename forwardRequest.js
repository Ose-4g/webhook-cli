const axios = require('axios');
const chalk = require('chalk');

const forwardRequest = async ({ method, headers, query, body }, localurl) => {
  try {
    await axios({
      method,
      url: localurl,
      body,
      headers,
      query,
    });
  } catch (error) {
    console.log(chalk.red("An error occured. Ensure you're connected to the internet"));
  }
};

module.exports = forwardRequest;
