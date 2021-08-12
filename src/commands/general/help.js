const { readdirSync } = require("fs");
const path = require("path");
const prefix = require("../../config").prefix;

module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown: 1000 * 10,
  description: "Shows all available bot commands.",

  run: async (conn, m, args) => {
    if (!args[0]) {
      let categories = [];

      readdirSync(path.join(__dirname + "/../")).forEach((dir) => {
        const commands = readdirSync(
          path.join(__dirname + `/../${dir}`)
        ).filter((file) => file.endsWith(".js"));

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `${prefix}${name},`;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      let teks = ``;
      teks += `Hi *${conn.getName(m.sender)}*\n\n`;
      teks += `📬 Need help? Here are all of my commands:\n\n`;
      let features = categories.map((i) => {
        let categori = i.name;
        let listFeature = i.value.split(",");
        teks += `Kategori: ${i.name}\n`;
        teks += `${listFeature.join("\n")}\n`;
      });
      teks += `\nUse ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help lihatsemuakelas.`;
      conn.reply(m.chat, teks, m);
    } else {
      const command =
        conn.commands.get(args[0].toLowerCase()) ||
        conn.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        return conn.reply(
          m.chat,
          `Invalid command! Use ${prefix}help for all of my commands!`
        );
      }

      let teks = "Command Details: \n";
      teks += `Prefix: ${prefix}\n\n`;
      teks += `Command: ${
        command.name ? command.name + "\n" : "No name for this command."
      }\n`;
      teks += `Aliases: ${
        command.aliases
          ? command.aliases.join(",") + "\n"
          : "No aliases for this command."
      }\n`;
      teks += `Usage: ${
        command.usage
          ? prefix + command.usage + "\n"
          : prefix + command.name + "\n"
      }`;
      teks += `Description: ${
        command.description
          ? command.description
          : "No description for this command."
      }`;
      return conn.reply(m.chat, teks, m);
    }
  },
};
