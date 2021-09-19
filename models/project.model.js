'use strict';

const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  name: String,
  description: String,
  category: String,
  year: Number,
  langs: String,
  image: String,
});

module.exports = mongoose.model('Project', projectSchema);
