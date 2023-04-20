const { Schema, model, Types } = require("../connection");

const schema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  tournament: { type: Types.ObjectId, ref: "tournament" },
  description: String,
  playerA: { type: Types.ObjectId, ref: "player" },
  playerB: { type: Types.ObjectId, ref: "player" },
  duration: Number,
  matchData: {type : Object, default: {}},
  status: { type: String, default: "pending" },
  scheduled: Date,
  created_at: Date,
  updated_at: Date,
});

module.exports = model("match", schema);
