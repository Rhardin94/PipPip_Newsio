//Routing dependencies
const db = require("../models");
module.exports = app => {
  //Get route for all unsaved articles
  app.get("/", (req, res) => {
    db.Article.find({saved: false}).populate("notes").then((result) => {
      res.render("index", {
        stories: result
      });
    }).catch((err) => {
      res.json(err);
    });
  });
  //Get route for all saved articles
  app.get("/saved", (req, res) => {
    db.Article.find({saved:true}).populate("notes").then((result) => {
      res.render("saved", {
        stories: result
      });
    }).catch((err) => {
      res.json(err);
    });
  });
};