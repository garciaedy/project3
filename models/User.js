const mongoose = require("../db/connections");
const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  category: String,
  image: String,
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: "VideoGame"
    }
  ]
});

module.exports = mongoose.model("User", User);

