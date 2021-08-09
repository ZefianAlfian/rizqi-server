const path = require("path");
const express = require("express");

module.exports = async ({ app }) => {
  app.enable("trust proxy");
  app.set("json spaces", 2);
  app.set("views", path.join(__dirname, "/../../views"));
  app.use("/static", express.static(path.join(__dirname, "/../../public")));

  app.get("/status", (_req, res) => {
    res.status(200).end();
  });
  app.head("/status", (_req, res) => {
    res.status(200).end();
  });

  app.use((_req, _res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  app.use((err, _req, res, next) => {
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });
  app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
