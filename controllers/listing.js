const Listing = require("../models/listing");
const mongoose = require("mongoose");
const axios = require("axios");

// Default image fallback
const defaultImage = {
  url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
  filename: "default"
};

// INDEX ROUTE — supports optional category filter
module.exports.index = async (req, res) => {
  const { category } = req.query;
  const allListings = category
    ? await Listing.find({ category })
    : await Listing.find({});

  res.render("listings/index.ejs", {
    allListings,
    selectedCategory: category || null
  });
};

// SEARCH ROUTE — search by country
module.exports.searchByCountry = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    req.flash("error", "Please enter a country name to search.");
    return res.redirect("/listings");
  }

  const listings = await Listing.find({
    country: { $regex: new RegExp(q, "i") }
  });

  res.render("listings/index.ejs", {
    allListings: listings,
    selectedCategory: null
  });
};

// NEW ROUTE
module.exports.renderNewForm = async (req, res) => {
  res.render("listings/new.ejs");
};

// SHOW ROUTE
module.exports.showListing = async (req, res) => {
  const id = req.params.id.trim();

  if (!mongoose.isValidObjectId(id)) {
    req.flash("error", "Invalid listing ID.");
    return res.redirect("/listings");
  }

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" }
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested does not exist.");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// CREATE ROUTE
module.exports.createListing = async (req, res) => {
  const data = req.body.listing;
  const newListing = new Listing(data);
  newListing.owner = req.user._id;

  // Handle image
  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  } else {
    newListing.image = defaultImage;
  }

  // Geocode using Nominatim
  try {
    const fullLocation = `${data.location}, ${data.country}`;
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: fullLocation,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "ListingApp/1.0 (your@email.com)"
      },
    });

    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      newListing.geometry = {
        type: "Point",
        coordinates: [parseFloat(lon), parseFloat(lat)],
      };
    } else {
      req.flash("error", "Could not geocode the location.");
      return res.redirect("/listings/new");
    }
  } catch (err) {
    console.error("Geocoding error:", err);
    req.flash("error", "Geocoding service failed. Try again later.");
    return res.redirect("/listings/new");
  }

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

// EDIT ROUTE
module.exports.renderEditForm = async (req, res) => {
  const id = req.params.id.trim();
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listings");
  }

  const originalImageUrl = listing.image?.url || defaultImage.url;

  res.render("listings/edit.ejs", {
    listing,
    originalImageUrl
  });
};

// UPDATE ROUTE
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body.listing;

  if (typeof updatedData.image === "string") {
    updatedData.image = {
      url: updatedData.image,
      filename: "default",
    };
  }

  let listing = await Listing.findByIdAndUpdate(id, updatedData, { new: true });

  // Geocode updated location
  try {
    const fullLocation = `${updatedData.location}, ${updatedData.country}`;
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: fullLocation,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "ListingApp/1.0 (your@email.com)"
      },
    });

    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      listing.geometry = {
        type: "Point",
        coordinates: [parseFloat(lon), parseFloat(lat)],
      };
    }
  } catch (err) {
    console.error("Geocoding error during update:", err);
  }

  // Handle image update
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  } else if (!listing.image || !listing.image.url) {
    listing.image = defaultImage;
  }

  await listing.save();
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// DELETE ROUTE
module.exports.destroyListing = async (req, res) => {
  const id = req.params.id.trim();
  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
