const mongoose = require('mongoose');
const UserSchema =  mongoose.Schema({
  name: String,
  password: String,
  email: String,
  isLoggedIn: Boolean,
  authToken: {type: String, default: null},
}, {
  timestamps: true,
});
module.exports = mongoose.model('User', UserSchema);
