const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Questionnaire", schema);
