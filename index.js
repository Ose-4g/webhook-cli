#! /usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const getRemoteUrl = require('./getRemoteUrl');
const connect = require('./connect');

program
  .command('get <password>')
  .description('get the remote url for the given email')
  .action((password) => {
    if (!password) console.log(chalk.red.bold('password is required'));
    else getRemoteUrl(password);
  });

program
  .command('connect')
  .description('Webhook cli tool to connect to a webhook online and forward that request to your local server')
  .option('-p, --pass <pass>', 'password used when creating the url')
  .option('-u, --url <url>', 'url on the web to connect to')
  .option('-po, --port <port>', 'port on your machine which the request should be forwarded to')
  .option(
    '-pa, --path <path>',
    'Path to which the request should be forwarded to. The request wil be made to localhost:port{path}'
  )
  .action((options) => {
    const { url, port, path, pass } = options;
    if (!url) console.log(chalk.red('url is required'));
    else if (!path) console.log(chalk.red('path is required'));
    else if (!port) console.log(chalk.red('port is required'));
    else if (!pass) console.log(chalk.red('password is required'));
    else {
      process.stdout.write('connecting to remote webhook at ');
      console.log(chalk.blue(`${url}`));
      connect(pass, url, port, path);
    }
  });

program.parse();
