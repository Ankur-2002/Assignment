const Monogose = require('mongoose');
const Scheme = Monogose.Schema;

const Entry = Scheme(
  {
    username: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    owner: {
      ref: Monogose.Schema.Types.ObjectId,
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Monogose.model('Entry', Entry);
