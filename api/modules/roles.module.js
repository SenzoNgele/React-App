const mongoose = require("mongoose");

const roleSchema = mongoose.Schema(
  {
    description: {
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
  { collection: "Roles" }
);

module.exports = mongoose.model("Roles", roleSchema);
