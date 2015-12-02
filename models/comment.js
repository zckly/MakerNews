var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  postID: { type: String, unique: true, index: true },
  creator: String,
  creatorUID: String,
  postID: String,
  postTitle: String,
  text: String,
  creationDate: { type: Date, default: Date.now() },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  reports: { type: Number, default: 0 },
});

module.exports = mongoose.model('Comment', commentSchema);