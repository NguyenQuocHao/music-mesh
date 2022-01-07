require('dotenv').config()
const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const google = require("googleapis").google;
const OAuth2 = google.auth.OAuth2
const CONFIG = require("./config");
const youtube = google.youtube("v3");
const oauth2Client = new OAuth2(
  CONFIG.oauth2Credentials.client_id,
  CONFIG.oauth2Credentials.client_secret,
  CONFIG.oauth2Credentials.redirect_uris[0]
);

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      oauth2Client.credentials.access_token = accessToken;
      oauth2Client.credentials.refresh_token = refreshToken;
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/popularSongs', function (req, res) {
  console.log("Access token: "+ oauth2Client.credentials.access_token)
  youtube.videos
    .list({
      auth: oauth2Client,
      chart: 'mostPopular',
      part: "id,snippet",
      videoCategoryId: 10,
      regionCode: "CA",
      maxResults: 15
    })
    .then(data => {
      res.send(data.data.items)
    })
    .catch(e => {
      console.log(e)
    });
});

app.get('/myPlaylists', (req, res) => {
  youtube.playlists
    .list({
      auth: oauth2Client,
      part: "snippet,contentDetails",
      mine: true,
      maxResults: 15
    })
    .then(data => {
      console.log("Items: " + data.data.items)
      res.send(data.data.items)
    })
    .catch(e => {
      console.log(e)
    });
})

app.get('/randomPlaylists', (req, res) => {
  youtube.playlists
    .list({
      auth: oauth2Client,
      part: "snippet,contentDetails",
      channelId: "UC-9-kyTW8ZkZNDHQJ6FgpwQ", // Music channel Id
      maxResults: 15
    })
    .then(data => {
      res.send(data.data.items)
    })
    .catch(e => {
      console.log(e)
    });
})

app.get('/relatedVideos', (req, res) => {
  youtube.search.list({
    auth: oauth2Client,
    part: "snippet",
    relatedToVideoId: req.body.videoId,
    type: 'video',
    videoCategoryId: 10,
    maxResults: 15,
  })
    .then(data => {
      res.send(data.data.items)
    })
    .catch(e => {
      console.log(e)
    });
})

app.listen("5000", () => {
  console.log("Server is running!");
});
