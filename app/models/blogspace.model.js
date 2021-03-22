const mongoose = require('mongoose');
const BlogSpaceSchema =  mongoose.Schema({
  name: String,
  description: String,
  category: String,
  theme: String,
  createdByUserEmail: String,
}, {
  timestamps: true,
});
module.exports = mongoose.model('BlogSpace', BlogSpaceSchema);
