const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listing");
const { isLoggedIn, isOwner } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });
const Listing = require("../models/listing"); // required to perform direct queries
const catchAsync = require("../utils/catchAsync"); // ensure your async errors are handled
const ExpressError = require("../utils/ExpressError"); // optional custom error class
const flash = require("connect-flash");

// INDEX route (all listings or filtered by category)
router.get("/", listingController.index);

//  SEARCH route — filters listings by country with error handling
router.get("/search", catchAsync(async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === "") {
    req.flash("error", "Please enter a country to search.");
    return res.redirect("/listings");
  }

  const listings = await Listing.find({
    country: { $regex: new RegExp(q, "i") }
  });

  if (listings.length === 0) {
    req.flash("error", `No listings found for "${q}".`);
    return res.redirect("/listings");
  }

  res.render("listings/index", {
    allListings: listings,
    selectedCategory: null
  });
}));

// NEW listing form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// CREATE new listing
router.post("/", isLoggedIn, upload.single("listing[image]"), listingController.createListing);

// SHOW single listing
router.get("/:id", listingController.showListing);

// EDIT listing form
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

// UPDATE listing
router.put("/:id", isLoggedIn, isOwner, upload.single("listing[image]"), listingController.updateListing);

// DELETE listing
router.delete("/:id", isLoggedIn, isOwner, listingController.destroyListing);

module.exports = router;
