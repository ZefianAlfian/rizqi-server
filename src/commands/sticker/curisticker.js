const { addMetadata } = require("../../utils/functions");
module.exports = {
  name: "curisticker",
  aliases: ["curisticker", "ambilsticker"],
  description: "Mencuri Sticker dengan Gaya",
  run: async (conn, m, args) => {
    const encmed = isQuotedSticker ? lol.quoted : lol;
    const ran = getRandom();
    const media = await client.downloadAndSaveMediaMessage(
      encmed,
      `./temp/${ran}`
    );
  },
};
