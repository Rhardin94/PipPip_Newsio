//Dependencies
require("dotenv").config();
const express = require("express");
const exhbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const PORT = process.env.PORT || 4500;
const path = require("path");
const app = express();
//Middleware configuration
//Logging requests with morgan
app.use(logger("dev"));
//Parsing requests
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//Set public directory as static folder
app.use(express.static(path.join(__dirname, "public")));
//Handlebars
app.engine("handlebars", exhbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
//Connecting to mongoose
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
//Routes
require("./routes/handlebarsRoutes")(app);
require("./routes/apiRoutes")(app);
//Start server
app.listen(PORT, () => {
  console.log("App listening on port " + PORT + "!");
});