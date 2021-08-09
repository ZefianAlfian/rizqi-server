const humanizeDuration = require("humanize-duration");
const cooldowns = new Map();

const isFiltered = (from) => {
  return cooldowns.get(from);
};

const remain = (from) => {
  const cd = cooldowns.get(from);
  const remaining = humanizeDuration(cd - Date.now(), { language: "en" });
  return remaining;
};

const addFilter = (from, timeout) => {
  cooldowns.set(from, Date.now() + timeout);
  setTimeout(() => {
    return cooldowns.delete(from);
  }, timeout); // 5sec is delay before processing next command
};

module.exports = {
  addFilter: addFilter,
  isFiltered: isFiltered,
  remain: remain,
};
