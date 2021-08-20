const { MessageType } = require("@adiwajshing/baileys");
const { findOne } = require("../../utils/dbFunction");
const { getSession, lihatSemuaKelas } = require("../../utils/functions");

module.exports = {
  name: "absen",
  login: true,
  aliases: ["absensi"],
  description: "Absen pelajaran menggunakan akun mu",

  run: async (conn, m, args) => {
    const obj = await findOne({ nomor: m.sender });
    const session = await getSession(obj.username, obj.password, obj.ajaran);

    const semuaKelas = await lihatSemuaKelas(session);
    let rows = [];
    for (i in semuaKelas.data.data) {
      rows.push({
        title: `${semuaKelas.data.data[i][1]}`,
        description: `${semuaKelas.data.data[i][2]}`,
        rowId: `${semuaKelas.data.data[i][0]}`,
      });
    }
    const sections = [{ title: "Pelajaran", rows: rows }];

    const button = {
      buttonText: "Show Pelajaran",
      description: "Lihat pelajaran yang ada di akun E-Learning kamu",
      sections: sections,
      listType: 1,
    };

    const sendMsg = await conn.sendMessage(
      m.chat,
      button,
      MessageType.listMessage
    );
  },
};
