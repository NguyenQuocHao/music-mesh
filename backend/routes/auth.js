const router = require("express").Router();
const passport = require("passport");
const axios = require('axios');
const CLIENT_URL = "http://localhost:3000/youtube";
const SPOTIFY_URL = "http://localhost:3000/spotify";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  axios.get('http://localhost:5000/spotify/clearTokensCache')
  .then(data => {
    console.log("Cleared Spotify cached.")
  })
  .catch(err => {
    console.log(err)
  })

  axios.get('http://localhost:5000/youtube/clearTokensCache')
  .then(data => {
    console.log("Cleared Youtube cached.")
  })
  .catch(err => {
    console.log(err)
  })

  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", {
  // scope: ["profile"],
  scope: ['https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    "https://www.googleapis.com/auth/youtube"],
  accessType: 'offline', prompt: 'consent'
}));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/spotify", passport.authenticate("spotify", {
  scope: ['user-read-email', 'user-read-private'],
}));

router.get(
  "/spotify/callback",
  passport.authenticate("spotify", {
    successRedirect: SPOTIFY_URL,  
    failureRedirect: "/login/failed",
  })
);

module.exports = router