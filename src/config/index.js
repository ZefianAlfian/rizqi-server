const dotenv = require("dotenv");
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const db = require("monk")(process.env.MONGODB_URL).get("botsekolah");

module.exports = {
  db,
  admin: process.env.ADMIN || "6289630171792@s.whatsapp.net",
  port: process.env.PORT || 3000,
  prefix: process.env.PREFIX || "/",
  mongodb_url: process.env.MONGODB_URL,
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
};
