const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
const User = Scheme(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', User);
