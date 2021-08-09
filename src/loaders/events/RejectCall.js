const { Logger } = require("../logger");
module.exports = (conn) => {
  conn.on("CB:Call", async (json) => {
    let number = json[1]["from"];
    let isOffer = json[1]["type"] == "offer";
    if (number && isOffer && json[1]["data"]) {
      let tag = conn.generateMessageTag();
      let NodePayload = [
        "action",
        "call",
        [
          "call",
          {
            from: conn.user.jid,
            to: number.split("@")[0] + "@s.whatsapp.net",
            id: tag,
          },
          [
            [
              "reject",
              {
                "call-id": json[1]["id"],
                "call-creator": number.split("@")[0] + "@s.whatsapp.net",
                count: "0",
              },
              null,
            ],
          ],
        ],
      ];
      conn.send(`${tag}, ${JSON.stringify(NodePayload)}`);
      conn.reply(number, "Tolong jangan telpon bot ini!");
      Logger.info(`${number} or ${conn.getName(number)} telah menelpon bot`);
    }
  });
};
