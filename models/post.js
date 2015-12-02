var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  creationDate: { type: Date, default: Date.now() },
  title: String,
  url: String,
  tags: [String],
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  reports: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Post', postSchema);