const db = require("../models");
module.exports = function (app) {
  app.get("/", (req, res) => {
    res.render("index");
  });
  app.get("/articles", (req, res) => {
    db.Article.find({}).populate("notes").then((result) => {
      res.json(result);
    }).catch((err) => {
      console.error(err);
    });
  });
};