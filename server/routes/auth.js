const router = require("express").Router();
const passport = require("passport");
const upload = require("../config/multer");
const { register, login } = require("../controllers/auth");
router.post("/register", upload.single("picture"), register);
router.post("/login", login);
module.exports = router;
