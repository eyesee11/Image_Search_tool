const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL + "/login",
  }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: process.env.CLIENT_URL + "/login",
  }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: process.env.CLIENT_URL + "/login",
  }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      user: {
        id: req.user._id,
        displayName: req.user.displayName,
        email: req.user.email,
        provider: req.user.provider,
      },
    });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;
