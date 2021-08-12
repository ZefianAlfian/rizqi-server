const { db } = require("../config");

const findOne = (obj) =>
  new Promise((resolve, reject) => {
    db.findOne(obj)
      .then((doc) => {
        resolve(doc);
      })
      .catch((e) => {
        reject(e);
      });
  });

const insertNewUser = (nomor, username, password, ajaran = "2021") =>
  new Promise((resolve, reject) => {
    db.insert(obj)
      .then((doc) => {
        resolve(doc);
      })
      .catch((e) => {
        reject(e);
      });
  });

const findOneAndDelete = (obj) =>
  new Promise((resolve, reject) => {
    db.findOneAndDelete(obj)
      .then((doc) => {
        resolve(doc);
      })
      .catch((e) => {
        reject(e);
      });
  });

module.exports = {
  findOne,
  insertNewUser,
  findOneAndDelete,
};
