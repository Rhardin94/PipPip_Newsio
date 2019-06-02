//Routing dependencies
const axios = require("axios");
const db = require("../models");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
module.exports = (app) => {
  //Get route for initiating scrape
  app.get("/api/scrape", (req, res) => {
    //Get request to retrieve data for cheerio scrape
    axios.get("https://www.bbc.com/news/world").then((response) => {
      //syncing cheerio with reponse
      let $ = cheerio.load(response.data);
      //result array
      let resArray = [];
      //Looping through site-specific containers for headline, summary, and url
      $("div.gs-c-promo-body div").each((i, element) => {
        //Creating empty result object to put scrape data into
        let result = {};
        //Creating headline property with headline text minues "\n", and returning to string
        result.headline = $(element).children("a").text().split("\n").toString();
        //Creating summary property with summary text
        result.summary = $(element).children("p").text();
        //Creating url property with href source url
        result.url = $(element).children("a").attr("href");
        //Checking scrape results to filter out empty headlines, empty summaries, and catching url's without first part of url
        if ((result.headline !== "") && (result.summary !== "") && (!result.url.includes("https://"))) {
          //Prepending first part of url to each result.url for functioning links  
          result.url = "https://www.bbc.com" + result.url;
          resArray.push(result);
        }
      });
      //Solution for separating stored scraped data found here: https://codeburst.io/javascript-array-distinct-5edc93501dc4
      //Array for holding distinct scraped data
      let distinctArray = [];
      //Setting map constructor to a variable
      const map = new Map();
      //Looping through unfiltered array
      for (const item of resArray) {
        //Checking if map constructor has each headline
        if (!map.has(item.headline)) {
          //If not, adds to headline to the constructor for mapping through
          map.set(item.headline, true);
          //Pushes distanct data from map above into distinct array in JSON format once again
          distinctArray.push({
            headline: item.headline,
            summary: item.summary,
            url: item.url
          });
        }
      }
      //Looping through distinctArray to create BSON's in database
      distinctArray.forEach((story) => {
        db.Article.create(story).then((dbStory) => {
          res.json(dbStory);
          //console.log(dbStory);
        });
      }).catch((err) => {
        res.json(err);
      });
    });
  });
  //Delete route to clear unsaved of articles
  app.delete("/api/clear", (req, res) => {
    db.Article.deleteMany({saved: false}).then(() => {
      location.reload();
    }).catch(err => {
      res.json(err);
    });
  });
  //Delete route to clear saved articles
  app.delete("/api/clearsaved", (req, res) => {
    db.Article.deleteMany({saved: true}).then(() => {
      location.reload();
    }).catch(err => {
      res.json(err);
    });
  });
  //Put route for saving an article
  app.put("/api/save/:id", (req, res) => {
    console.log(req.params.id);
    db.Article.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(req.params.id)
    }, {
      $set: {
        saved: true
      }
    }).then(() => {
      location.reload();
    }).catch(err => {
      res.json(err);
    });
  });
  //Put route for unsaving an article
  app.put("/api/unsave/:id", (req, res) => {
    db.Article.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(req.params.id)
    }, {
      $set: {
        saved: false
      }
    }).then(() => {
      location.reload();
    }).catch(err => {
      res.json(err);
    });
  });
  //Post route for adding note to an article
  app.post("/saved/:id", (req, res) => {
    db.Note.create(req.body).then(dbNote => {
      return db.Article.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(req.params.id)
      }, {
        $push: {
          notes: dbNote
        }
      }, {
        new: true
      });
    }).then((dbArticle) => {
      res.json(dbArticle);
    }).catch((err) => {
      res.json(err);
    });
  });
  //Get route for specific article
  app.get("/articles/:id", (req, res) => {
    db.Article.findOne({
      _id: mongoose.Types.ObjectId(req.params.id)
    }).populate("notes").then((result) => {
      res.json(result);
    }).catch((err) => {
      res.json(err);
    });
  });
  //Delete route for deleting specific note from article and db
  app.delete("/api/note/:id", (req, res) => {
    db.Note.deleteOne({_id: mongoose.Types.ObjectId(req.params.id)}).then((response) => {
      res.json(response);
    }).catch((err) => {
      res.json(err);
    });
  });
};