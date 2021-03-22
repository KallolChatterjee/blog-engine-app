const mongoose = require('mongoose');
const PostSchema =  mongoose.Schema({
  title: String,
  description: String,
  blogSpaceName: String,
  createdByUserEmail: String,
}, {
  timestamps: true,
});
module.exports = mongoose.model('Post', PostSchema);
