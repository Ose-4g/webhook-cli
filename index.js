#! /usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");
const getRemoteUrl = require("./getRemoteUrl");
const connect = require("./connect");

program
  .command("get <email>")
  .description("get the remote url for the given email")
  .action((email) => {
    if (!email) console.log(chalk.red.bold("email is required"));
    else getRemoteUrl(email);
  });

program
  .command("connect")
  .description(
    "Webhook cli tool to connect to a webhook online and forward that request to your local server"
  )
  .option("-u, --url <url>", "url on the web to connect to")
  .option(
    "-po, --port <port>",
    "port on your machine which the request should be forwarded to. Defaults tp 2022"
  )
  .option(
    "-pa, --path <path>",
    "Path to which the request should be forwarded to. The request wil be made to localhost:port{path}"
  )
  .action((options) => {
    const { url, port, path } = options;
    if (!url) console.log(chalk.red("url is required"));
    else if (!path) console.log(chalk.red("path is required"));
    else if (!port) console.log(chalk.red("port is required"));
    else {
      process.stdout.write("connecting to remote webhook at ");
      console.log(chalk.blue(`${url}`));
      connect(url, port, path);
    }
  });

program.parse();
