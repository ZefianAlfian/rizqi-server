const expressLoader = require("./express.js");
const baileysLoader = require("./baileys.js");
const { Logger } = require("./logger.js");

module.exports = async ({ expressApp, baileysConn }) => {
  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");

  await baileysLoader({ conn: baileysConn });
  Logger.info("✌️ Baileys loaded");
};
