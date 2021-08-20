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

    if (
      !args.length ||
      args.join``.split("|").length > 3 ||
      args.join``.split("|").length < 3
    ) {
      return conn.reply(
        m.chat,
        `Gunakan format seperti ini : /login username|password|ajaran\n\nContoh : /login 00873628|YWHPTS|2021`
      );
    }
    const username = args.join``.split("|")[0];
    const password = args.join``.split("|")[1];
    const tahun = args.join``.split("|")[2];
    if (tahun > new Date().getFullYear() || tahun < new Date().getFullYear()) {
      return conn.reply(
        m.chat,
        `Kita masih di tahun ${new Date().getFullYear()}`
      );
    }
    insertNewUser(m.sender, username, password, tahun).then(() => {
      conn.reply(m.chat, `Data anda telah kami simpan`);
    });
  },
};
