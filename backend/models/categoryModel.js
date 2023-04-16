const { Schema, model, Types } = require("../connection");

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  players: { type: String, required: true },
  created_at: Date,
  updated_at: Date,
});

module.exports = model("categories", userSchema);
