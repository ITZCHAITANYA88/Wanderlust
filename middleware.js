const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema, reviewSchema } = require("./utils/schema.js");
console.log("✅ SCHEMAS:", { listingSchema, reviewSchema });
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to do that!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currentUser._id)) {
    req.flash("error", "Access denied: You are not authorized to manage this listing.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  console.log("🔥 Review form data:", req.body); 

  if (!req.body.review) {
    throw new ExpressError(400, "Review data is missing.");
  }

const { error } = reviewSchema.validate(req.body); 

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review.author.equals(res.locals.currentUser._id)) {
    req.flash("error", "Access denied: You are not authorized to delete this review.");
    return res.redirect(`/listings/${id}`);
  }

  next();
};
