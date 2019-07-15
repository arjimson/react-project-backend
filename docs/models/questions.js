const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const schema = new Schema({
  category: {
    type: String,
    required: true
  },
  questionType: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: [],
    required: false
  },
  choices: {
    type: [],
    required: false
  },
  timeAllotment: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Item", schema);
