const mongoose = require("mongoose");


const Listing = mongoose.models.Listing || mongoose.model("Listing", new mongoose.Schema({
  title: String,
  description: String,
  image: {
    url: String,
    filename: String
  },
  price: Number,
  location: String,
  country: String,
  category: {
    type: String,
    enum: [
      "trending",
      "rooms",
      "iconiccities",
      "mountains",
      "castle",
      "amazingpools",
      "camping",
      "farmhouse",
      "arctic"
    ],
    required: true
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}));

module.exports = Listing;
