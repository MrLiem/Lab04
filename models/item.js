const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  brand: {
    type: String,
  },
  summary: {
    type: String,
  },
  image: {
    type: Buffer,
  },
  price: {
    type: Number,
  },
  number: {
    type: Number,
  },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = { Item };
