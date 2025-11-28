// Load env only in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Routers
const listingsRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// ---------------------------
// 🔥 GLOBAL ERROR HANDLERS
// ---------------------------
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

// ---------------------------
// 🔥 MONGODB CONNECTION (resilient with retries)
// ---------------------------
const dbUrl = process.env.ATLASDB_URL;

async function connectWithRetry() {
  const maxAttempts = 5;
  let attempt = 1;

  while (attempt <= maxAttempts) {
    try {
      await mongoose.connect(dbUrl);
      console.log("MongoDB connected");
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${attempt} failed:`, err.message);
      if (attempt === maxAttempts) {
        console.error("❌ Max attempts reached. Server will still run without DB.");
        return;
      }
      const delay = 2000 * attempt;
      console.log(`Retrying in ${delay}ms...\n`);
      await new Promise((res) => setTimeout(res, delay));
      attempt++;
    }
  }
}

connectWithRetry();

// ---------------------------
// View engine + middlewares
// ---------------------------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// ---------------------------
// Session Store
// ---------------------------
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.error("❌ ERROR IN MONGO SESSION STORE", err);
});

// ---------------------------
// Session options
// ---------------------------
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// ---------------------------
// Passport
// ---------------------------
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ---------------------------
// Template locals
// ---------------------------
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ---------------------------
// Routers
// ---------------------------
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// ---------------------------
// 404 Handler
// ---------------------------
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// ---------------------------
// Error Handler
// ---------------------------
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  res.status(statusCode).render("listings/error.ejs", { err });
});

// ---------------------------
// Start server
// ---------------------------
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
