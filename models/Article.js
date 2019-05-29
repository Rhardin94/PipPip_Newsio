const mongoose = require("mongoose");
//Saving reference to mongoose's Schema constructor
const Schema = mongoose.Schema;
//Creating new UserSchema object
const ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  saved: {
    type: Boolean,
    default: false
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});
//Creating model from ArticleSchema
const Article = mongoose.model("Article", ArticleSchema);
//Exporting Model for further use
module.exports = Article;