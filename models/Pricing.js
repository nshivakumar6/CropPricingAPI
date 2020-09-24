const mongoose = require("mongoose");

const PricingSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  variety: {
    type: String,
    required: true,
  },
  market: {
    type: String,
    required: true,
  },
  average: {
    type: Number,
  },
  max: {
    type: Number,
  },
  min: {
    type: Number,
  },
  stdev: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Pricing = mongoose.model("pricing", PricingSchema);
