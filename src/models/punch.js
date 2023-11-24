const mongoose = require("mongoose");

const punchSchema = mongoose.Schema({
  entryDate: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  outDate: {
    type: String,
    required: true

  },
  status: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Punch', punchSchema);    