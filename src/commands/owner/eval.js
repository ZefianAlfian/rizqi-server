module.exports = {
  name: "eval",
  aliases: ["e"],
  description: "Run JavaScript Code",

  run: async (conn, m, args) => {
    // if (m.sender !== "6289630171792@s.whatsapp.net")
    //   return conn.reply(m.chat, "Km bkn owner");

    if (args.length < 1) return conn.reply(m.chat, "No Javascript Code", m);
    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      conn.reply(m.chat, clean(evaled), m);
    } catch (err) {
      conn.reply(m.chat, `${clean(err)}`, m);
    }
  },
};
