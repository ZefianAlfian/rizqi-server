const { MessageType } = require("@adiwajshing/baileys");
const fs = require("fs");
const path = require("path");

const Collection = require("../discordjs/Collection");
const { Logger } = require("./logger");
const config = require("../config");

module.exports = async ({ conn }) => {
  conn.logger.level = "silent";
  conn.browserDescription = ["Bot", "Safari", "14"];
  conn.connectOptions.logQR = true;
  conn.commands = new Collection();
  conn.aliases = new Collection();
  conn.categories = fs.readdirSync(path.join(__dirname + "/../commands"));
  ["command"].forEach((handler) => {
    require(`../utils/${handler}`)(conn);
  });

  conn.on("qr", (_qr) => {
    Logger.info("Scan QRcode");
  });

  conn.on("open", () => {
    Logger.info("✌️ Baileys connected");
    fs.writeFileSync(
      "./session.json",
      JSON.stringify(conn.base64EncodedAuthInfo(), null, "\t")
    );
  });

  fs.existsSync("./session.json") && conn.loadAuthInfo("./session.json"); // will load JSON credentials from file
  await conn.connect({ timeoutMs: 3 * 1000 });

  fs.readdirSync(path.join(__dirname + "/events")).map((items) => {
    require(`./events/${items}`)(conn);
    Logger.info(`✌️ Events ${items} loaded`);
  });
};
