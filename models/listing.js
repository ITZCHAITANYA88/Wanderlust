const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const DEFAULT_IMAGE = {
  filename: "default",
  url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
};

// Subschema for image (no _id field)
const imageSchema = new Schema({
  filename: String,
  url: String,
}, { _id: false });

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  image: {
    type: imageSchema,
    default: DEFAULT_IMAGE,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  location: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  category: {
    type: String,
    enum: [
      "mountains",
      "arctic",
      "farmhouse",
      "camping",
      "amazingpools",
      "castle",
      "iconiccities",
      "rooms",
      "trending"
    ],
  },
}, { timestamps: true });

//  Ensure image fallback if missing
listingSchema.pre("validate", function (next) {
  if (
    !this.image ||
    typeof this.image === "string" ||
    !this.image.url ||
    this.image.url.trim() === ""
  ) {
    this.image = DEFAULT_IMAGE;
  }
  next();
});

//  Cascade delete reviews on listing deletion
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

//  Prevent OverwriteModelError during development
module.exports = mongoose.models.Listing || mongoose.model("Listing", listingSchema);
