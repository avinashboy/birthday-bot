const mongoose = require('mongoose');

const bDbSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  baseTime: {
    type: String,
    require: true
  },
  descriptionHead: {
    type: String,
    require: true
  },
  mainHead: {
    type: String,
    require: true
  },
  month: {
    type: String,
    require: true
  },
  titleHead: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("brithCounter", bDbSchema)