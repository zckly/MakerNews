var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  postID: String,
  creator: String,
  creatorUID: String,
  commentBody: String,
  parentCommentUID: String,
  creationDate: { type: Date, default: Date.now() },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  reports: { type: Number, default: 0 },
});

module.exports = mongoose.model('Comment', commentSchema);