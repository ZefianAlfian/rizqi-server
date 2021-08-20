const prefix = require("../../config").prefix;
const msgFilter = require("../../utils/msgFilter");
const simple = require("../../baileys/Simple");
const { Logger } = require("../logger");
const { findOne } = require("../../utils/dbFunction");

module.exports = (conn) => {
  conn.on("chat-update", async function (chatUpdate) {
    if (!chatUpdate.hasNewMessage) return;
    if (!chatUpdate.messages && !chatUpdate.count) return;
    if (!chatUpdate) return;
    let m = chatUpdate.messages.all()[0];

    simple.smsg(conn, m);

    const { text, mtype } = m;
    body =
      mtype === "conversation" && text.startsWith(prefix)
        ? text
        : (mtype === "imageMessage" || mtype === "videoMessage") &&
          text &&
          text.startsWith(prefix)
        ? text
        : mtype === "ephemeralMessage" && text.startsWith(prefix)
        ? text
        : mtype === "extendedTextMessage" && text.startsWith(prefix)
        ? text
        : "";

    const argv = body.slice(1).trim().split(/ +/).shift().toLowerCase();
    const args = body.trim().split(/ +/).slice(1);

    let command = conn.commands.get(argv);
    if (!command) command = conn.commands.get(conn.aliases.get(argv));

    if (command) {
      await conn.chatRead(m.chat);
      m.isGroup
        ? Logger.info(
            `[ GC ] ${m.sender.split("@")[0]} or ${conn.getName(
              m.sender
            )} used command ${command.name}`
          )
        : Logger.info(
            `[ PC ] ${m.sender.split("@")[0]} or ${conn.getName(
              m.sender
            )} used command ${command.name}`
          );
      if (command.login) {
        if (!(await findOne({ nomor: m.sender }))) {
          return conn.reply(
            m.chat,
            "Silahkan Login terlebih dahulu menggunakan command */login*"
          );
        }
      }
      if (command.cooldown) {
        if (msgFilter.isFiltered(m.sender)) {
          conn.reply(
            m.chat,
            `You have to wait ${msgFilter.remain(
              m.sender
            )} before you can use command ${command.name} again`,
            m
          );
          return false;
        }
        msgFilter.addFilter(m.sender, command.cooldown);
        command.run(conn, m, args);
        return false;
      }
      command.run(conn, m, args);
    }
  });
};
