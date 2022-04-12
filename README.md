# webhook-cli

![npm (scoped)](https://img.shields.io/npm/v/@ose4g/webhook-cli)
![npm](https://img.shields.io/npm/dw/@ose4g/webhook-cli)
![npms.io (final)](https://img.shields.io/npms-io/maintenance-score/@ose4g/webhook-cli)
![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@ose4g/cron-manager)

One issue backend developers is testing webhooks locally.
Since the webhook must be connected to the internet an approach may be to write code and deploy in order to test.
This could be inefficient espeicially if you don't know what data to expect.  
Using this package you could proxy requests from a remote url to your server running locally.

## Installation

```bash
npm install -g @ose4g/webhook-cli
```

## Usage

- To get the remote url you'll be using run the following command.

  ```bash
  webhook-cli get password
  ```

  - replace **password** with your password.
  - make sure to note down your password as you'll need it to connect to that particular url again.

- It then logs the remote url you'll be using for testing. The urls are usually in the pattern `http://ose4g-webhook.herokuapp.com/<unique-code>/webhook`

- In your application(e.g github apps or stripe) set this url as your webhook.

- Once that is done run the following command in your terminal

```bash
webhook-cli connect --pass <password> --url <remote-url> --port <port> --path <path>
```

e.g

```bash
webhook-cli connect --pass password --url http://ose4g-webhook.herokuapp.com/<unique-code>/webhook --port 3000 --path /api/v1/webhook
```

- This makes a connection from the remote url to the specified server and proxies the request to the local server.
- You can then log the request and write code to test the webhook.
