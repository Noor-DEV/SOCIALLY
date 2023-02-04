const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
const path = require("path");
const fs = require("fs");
const allRoutes = require("./routes/index");
const Post = require("./models/Post");
const { isUserAuthenticated } = require("./middleware/permissions.auth");
require("dotenv").config();
require("./SSO/passportGoogle");
require("./SSO/passportJwt");
const config = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT || 8000,
};
const app = express();
app.use(express.json({ extended: true, limit: "30mb" }));
app.use(express.urlencoded({ extended: false, limit: "30mb" }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//HAS_AN_ERROR_CHECKOUT B4 UNCOMMENTING
app.use(
  cookieSession({
    maxAge: 5 * 24 * 60 ** 60 * 60,
    keys: [process.env.SESSION_SECRET],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use("/assets", express.static(path.join(__dirname, "public", "assets")));
//STORAGE.CONFIG
const upload = require("./config/multer");
//STORAGE.CONFIG
//ROUTES....
app.use((req, res, next) => {
  console.log(req.url, req.path);

  next();
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "index.html"));
});
app.use(allRoutes);

//ROUTES....
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`LISTENING ON PORT:${config.PORT} -- UP&RUNING.......`);
    });
  });
