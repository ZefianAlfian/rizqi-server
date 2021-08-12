const cheerio = require("cheerio");
const { Logger } = require("../../loaders/logger");
const { findOne, insertNewUser } = require("../../utils/dbFunction");
const { getSession, lihatSemuaKelas } = require("../../utils/functions");

module.exports = {
  name: "login",
  aliases: ["masuk", "signin"],
  description: "Masuk ke akun E-learning",

  run: async (conn, m, args) => {
    if (await findOne({ nomor: m.sender })) {
      return conn.reply(
        m.chat,
        "Kamu sudah masuk, jika ingin keluar gunakan command */logout*"
      );
    }
    if (!args.length || args.length > 1) {
      return conn.reply(
        m.chat,
        `Gunakan format seperti ini : /login username|password\n\nContoh : /login 00873628|YWHPTS`
      );
    }
    const username = args.split("|")[0];
    const password = args.split("|")[1];

    console.log(username, password);
  },
};
