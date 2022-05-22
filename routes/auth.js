require('dotenv').config();
const router = require("express").Router();
const passport = require("passport");
const axios = require('axios');
const baseUrl = process.env.BASE_URL || "http://localhost:5000";
const clientBaseUrl = process.env.BASE_URL || "http://localhost:3000";
const YOUTUBE_REDIRECT_URL = clientBaseUrl + "/youtube";
const SPOTIFY_REDIRECT_URL = clientBaseUrl + "/spotify";
const dbo = require('../db/conn');

router.get("/login/success", async function (req, res) {
  if (req.user) {
    if (req.user.provider === "google") {
      await axios.get(baseUrl + "/spotify/getInfo")
        .then(res => {
          req.user.linkedAccount = {
            displayName: res.data.display_name,
            photos: [{ value: res.data.images[0].url }],
            provider: "spotify"
          }
        })
        .catch(error => {
          console.log(error.response)
        })
    }
    else if (req.user.provider === "spotify") {
      await axios.get(baseUrl + "/youtube/getInfo")
        .then(res => {
          req.user.linkedAccount = {
            displayName: res.data.name,
            photos: [{ value: res.data.picture }],
            provider: "google"
          }
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }

  res.status(200).json({
    success: true,
    message: "successfull",
    user: req.user
  });
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/unconnect", async function (req, res) {
  if (!req.user.linkedAccount) {
    next();
  }

  // Remove linked account from database
  const dbConnect = dbo.getDb();
  const update = {
    $unset: {
      linkedAccount: ""
    },
  };

  const result = await dbConnect.collection('users').updateOne({ username: req.user.id }, update);
  console.log("Unlinked account for user with id:" + req.user.id)

  var redirectLink;
  // Clear token cache
  if (req.user.linkedAccount.provider === "google") {
    axios.get(baseUrl + '/youtube/clearTokensCache')
    redirectLink = YOUTUBE_REDIRECT_URL;
  }
  else if (req.user.linkedAccount.provider === "spotify") {
    axios.get(baseUrl + '/spotify/clearTokensCache')
    redirectLink = SPOTIFY_REDIRECT_URL;
  }

  req.user.linkedAccount = null
  res.redirect(redirectLink);
});

router.get("/logout", (req, res) => {
  axios.get(baseUrl + '/spotify/clearTokensCache')
  axios.get(baseUrl + '/youtube/clearTokensCache')

  req.logout();
  res.redirect(YOUTUBE_REDIRECT_URL);
});

router.get("/google/signin", passport.authenticate("google", {
  scope: ['https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    "https://www.googleapis.com/auth/youtube"],
  accessType: 'offline', prompt: 'consent'
}));

router.get(
  "/google/signin/callback",
  passport.authenticate("google", {
    successRedirect: YOUTUBE_REDIRECT_URL,
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
    res.redirect(YOUTUBE_REDIRECT_URL)
  }
);

router.get("/spotify/signin", passport.authenticate("spotify", {
  scope: ['user-read-email', 'user-read-private'],
}));

router.get(
  "/spotify/signin/callback",
  passport.authenticate("spotify", {
    successRedirect: SPOTIFY_REDIRECT_URL,
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
    res.redirect(SPOTIFY_REDIRECT_URL)
  }
);

module.exports = router