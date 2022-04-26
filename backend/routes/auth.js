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
      account: req.session.account
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/unconnect", (req, res) => {
  if (!req.user.linkedAccount) {
    next();
  }

  var redirectLink;
  if (req.user.linkedAccount.provider === "google") {
    axios.get('http://localhost:5000/youtube/clearTokensCache')
      .then(data => {
        console.log("Cleared Youtube cached.")
      })
      .catch(err => {
        console.log(err)
      })

      redirectLink = CLIENT_URL;
  }
  else if (req.user.linkedAccount.provider === "spotify") {
    axios.get('http://localhost:5000/spotify/clearTokensCache')
      .then(data => {
        console.log("Cleared Spotify cached.")
      })
      .catch(err => {
        console.log(err)
      })

      redirectLink = SPOTIFY_URL;
  }

  req.user.linkedAccount = null
  res.redirect(redirectLink);
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

router.get("/google/signin", passport.authenticate("google", {
  // scope: ["profile"],
  scope: ['https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    "https://www.googleapis.com/auth/youtube"],
  accessType: 'offline', prompt: 'consent'
}));

router.get(
  "/google/signin/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  }));

router.get("/google/connect", passport.authorize("google-authz", {
  scope: ['https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    "https://www.googleapis.com/auth/youtube"],
  accessType: 'offline', prompt: 'consent'
}));

router.get('/google/connect/callback',
  passport.authorize('google-authz', { failureRedirect: "/login/failed" }),
  function (req, res) {
    req.user.linkedAccount = req.account;
    res.redirect(CLIENT_URL)
  }
);

router.get("/spotify/signin", passport.authenticate("spotify", {
  scope: ['user-read-email', 'user-read-private'],
}));

router.get(
  "/spotify/signin/callback",
  passport.authenticate("spotify", {
    successRedirect: SPOTIFY_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/spotify/connect", passport.authorize("spotify-authz", {
  scope: ['user-read-email', 'user-read-private'],
}));

router.get('/spotify/connect/callback',
  passport.authorize('spotify-authz', { failureRedirect: "/login/failed" }),
  function (req, res) {
    req.user.linkedAccount = req.account;
    res.redirect(SPOTIFY_URL)
  }
);

module.exports = router