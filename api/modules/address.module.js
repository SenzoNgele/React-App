const mongoose = require("mongoose");
const addressSchema = mongoose.Schema(
  {
    address1: {
      type: String,
      required: true,
      max: 120
    },
    address2: {
      type: String,
      required: true,
      max: 120
    },
    address3: {
      type: String,
      required: true,
      max: 120
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  { collection: "Address" }
);

module.exports = mongoose.model("Address", addressSchema);
