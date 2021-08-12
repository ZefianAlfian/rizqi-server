const config = require("../../config");
const {
  findOne,
  insertNewUser,
  findOneAndDelete,
} = require("../../utils/dbFunction");

module.exports = {
  name: "logout",
  aliases: ["keluar", "logout", "signout"],
  description: "Masuk ke akun E-learning",

  run: async (conn, m, args) => {
    if (!(await findOne({ nomor: m.sender }))) {
      return conn.reply(
        m.chat,
        "Kamu belum masuk ke akun mana pun, Jika ingin masuk gunakan command */login*"
      );
    }
    findOneAndDelete({ nomor: m.sender })
      .then((_) => {
        conn.reply(m.chat, "Berhasil logout");
      })
      .catch((_) => {
        conn.reply(m.chat, "Gagal logout, silahkan contact admin");
        conn.sendContact(m.chat, config.admin, "Rizqi");
      });
  },
};
