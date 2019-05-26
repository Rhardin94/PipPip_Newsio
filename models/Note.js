const mongoose = require("mongoose");
//Saving refrence to mongoose's Schema constructor
const Schema = mongoose.Schema;
//Creating new UserSchema object
const NoteSchema = new Schema({
  title: String,
  body: String
});
//Creating note model from NoteSchema
const Note = mongoose.model("Note", NoteSchema);
//Exporting model for further use
module.exports = Note;