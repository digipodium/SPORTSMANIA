const { Schema, model, Types } = require("../connection");

const schema = new Schema({
  title: { type: String, required: true },
    type: { type: String, required: true },
  description: String,
  playerA: { type: Types.ObjectId, ref: "team" },
  playerB: { type: Types.ObjectId, ref: "team" },
  duration: Number,
  created_at: Date,
  updated_at: Date,
});

module.exports = model("teammatch", schema);
