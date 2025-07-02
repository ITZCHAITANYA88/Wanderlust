// Load environment variables if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Listing = require("../models/listing");
const { data: sampleListings } = require("./data"); // Import listings data

// MongoDB connection URL from environment or fallback
const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB and seed the database
main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

async function main() {
  await mongoose.connect(dbUrl);
  await seedDB();
  mongoose.connection.close();
}

// Seed function
async function seedDB() {
  try {
    // Optional: clear the existing listings
    await Listing.deleteMany({});
    console.log("Existing listings deleted");

    // Insert sample listings
    await Listing.insertMany(sampleListings);
    console.log("Sample listings inserted successfully 🌱");
  } catch (err) {
    console.error("Seeding failed ❌", err);
  }
}
