const path = require("path");
const { readdirSync } = require("fs");
module.exports = (conn) => {
  readdirSync(path.join(__dirname + "/../commands")).forEach((dir) => {
    const commands = readdirSync(
      path.join(__dirname + `/../commands/${dir}`)
    ).filter((file) => file.endsWith(".js"));
    for (let file of commands) {
      let pull = require(`../commands/${dir}/${file}`);
      if (pull.name) {
        conn.commands.set(pull.name, pull);
      } else {
        continue;
      }
      if (pull.aliases && Array.isArray(pull.aliases))
        pull.aliases.forEach((alias) => conn.aliases.set(alias, pull.name));
    }
  });
};
