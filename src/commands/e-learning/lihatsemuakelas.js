const cheerio = require("cheerio");
const { findOne } = require("../../utils/dbFunction");
const { getSession, lihatSemuaKelas } = require("../../utils/functions");

module.exports = {
  name: "lihatsemuakelas",
  login: true,
  aliases: ["showallclass", "lihatallkelas", "semuakelas"],
  description: "Memperlihatkan kelas yang ada di akun E-Learning kamu",

  run: async (conn, m, args) => {
    const obj = await findOne({ nomor: m.sender });
    const session = await getSession(obj.username, obj.password, obj.ajaran);

    const semuaKelas = await lihatSemuaKelas(session);
    let text = "";
    for (i in semuaKelas.data.data) {
      let src = cheerio.load(semuaKelas.data.data[i][7]);
      const resCher = src("a").attr("href");

      text += `*No :* ${semuaKelas.data.data[i][0]}\n`;
      text += `*Nama Kelas :* ${semuaKelas.data.data[i][1]}\n`;
      text += `*Deskripsi :* ${semuaKelas.data.data[i][2]}\n`;
      text += `*Kode Kelas :* ${semuaKelas.data.data[i][3]}\n`;
      text += `*Kelas :* ${semuaKelas.data.data[i][4]}\n`;
      text += `*Mapel :* ${semuaKelas.data.data[i][5]}\n`;
      text += `*Pertemuan :* ${semuaKelas.data.data[i][6]}\n`;
      text += `*Link Kelas :* ${resCher}\n\n`;
    }
    conn.reply(m.chat, text);
  },
};
