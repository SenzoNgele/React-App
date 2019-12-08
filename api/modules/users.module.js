const mongoose = require("mongoose");
const mongooseAutopopulate = require("mongoose-autopopulate");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roles",
        required: true,
        autopopulate: true
      }
    ],
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
  { collection: "User" }
);

/*change schema to a model that will be responsible for
 reading documents from mongodb database test.*/

userSchema.plugin(mongooseAutopopulate);
module.exports = mongoose.model("User", userSchema);
