const { Schema, model, Types } = require("../connection");

const userSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  createdBy: { type: Types.ObjectId, ref: "user" },
  players: [{ type: Types.ObjectId, ref: "player" }],
  gameDetails: Object,
  image : String,
  created_at: Date,
  updated_at: Date,
});

module.exports = model("games", userSchema);
