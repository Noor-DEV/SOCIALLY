const router = require("express").Router();
const passport = require("passport");
const authRoutes = require("./auth");
const userRoutes = require("./users");
const postRoutes = require("./posts");
const jwt = require("jsonwebtoken");
const { extractFriends, formatOutPut } = require("../controllers/utils");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:8000/login/no",
    successRedirect: "http://localhost:3000/",
    authInfo: true,
  })
  // async (req, res) => {
  //   const token = await jwt.sign(
  //     { sub: req.user._id, iat: Date.now(), email: req.user.email },
  //     process.env.JWT_SECRET
  //   );
  //   const extractedFriends = await extractFriends(req.user.friends);
  //   res.status(201).json({
  //     token,
  //     user: { ...formatOutPut(req.user), friends: extractedFriends },
  //   });
  // }
);
router.get("/login/no", (req, res) => {
  res.json({ msg: "LOGIN WITH GOOGLE FAILED" });
});
router.get("/login/ok", (req, res) => {
  console.log(req.user, ".................req.user..............");
  res.json({
    msg: "LOGIN_WITH_GOOGLE_SUCCEEDED",
    user: req.user || "NO_USER_2_DISPLAY",
  });
});
router.get("/isAuth", (req, res) => {
  if (req.user && req.isAuthenticated()) {
    return res.json({ msg: "AUTHENTICATED", isAuth: true, user: req.user });
  }
  return res.json({ msg: "NOT_AUTHENTICATED", isAuth: false });
});
module.exports = router;
