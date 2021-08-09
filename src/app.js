const {
  WAConnection: _WAConnection,
  MessageType,
} = require("@adiwajshing/baileys");
const express = require("express");
const { Logger } = require("./loaders/logger");
const config = require("./config");
const Simple = require("./baileys/Simple");

const WAConnection = Simple.WAConnection(_WAConnection);

async function startServer() {
  const app = express();
  const conn = new WAConnection();

  await require("./loaders")({ expressApp: app, baileysConn: conn });

  app
    .listen(config.port, () => {
      Logger.info(`
        ################################################
        🛡️  Server listening on port: ${config.port} 🛡️
        ################################################
      `);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
