const axios = require("axios");
const cheerio = require("cheerio");
module.exports = (app) => {
  app.get("/scrape", (req, res) => {
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
          resArray.push(result.headline);
        }
      });
      //Logging the results.
      //console.log(resArray);
      resArray.forEach((results) => {
        console.log(results.headline);
      });
    });
    res.send("Scrape Complete!");
  });
};