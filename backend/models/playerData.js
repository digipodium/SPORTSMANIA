const { Schema, model, Types } = require("../connection");

const schema = new Schema({
  name: { type: String, required: true },
  tournament: { type: Types.ObjectId, ref: "tournament" },
  image : String,
  playerData: Object,
  created_at: Date,
  updated_at: Date,
});

module.exports = model("player", schema);
