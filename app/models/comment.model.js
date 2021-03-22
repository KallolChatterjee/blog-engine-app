const mongoose = require('mongoose');
const CommentSchema =  mongoose.Schema({
  comment: String,
  createdByUserEmail: String,
  post: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'Post',
  }]
}, {
  timestamps: true,
});
module.exports = mongoose.model('Comment', CommentSchema);
