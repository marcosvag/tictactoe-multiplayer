const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (request, response) => {
    response.redirect("/");
  }
);

router.get("/logout", (request, response) => {
  request.logout((error) => {
    if (error) {
      return next(error);
    }
  });
  response.redirect("/");
});

module.exports = router;
