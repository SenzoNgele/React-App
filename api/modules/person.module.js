const mongoose = require("mongoose");
const mongooseAutopopulate = require("mongoose-autopopulate");

const personSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 120
    },
    surname: {
      type: String,
      required: true,
      max: 120
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true,
      max: 8
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      autopopulate: true
    },
    hobbies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hobbies",
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
  { collection: "Person" }
);

/*change schema to a model that will be responsible for
 reading documents from mongodb database test.*/

personSchema.plugin(mongooseAutopopulate);
module.exports = mongoose.model("Person", personSchema);
