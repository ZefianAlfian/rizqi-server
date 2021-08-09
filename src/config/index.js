const dotenv = require("dotenv");
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  port: process.env.PORT || 3000,
  prefix: process.env.PREFIX || "/",
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
};
