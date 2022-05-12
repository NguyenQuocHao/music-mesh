require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const google = require("googleapis").google;
const passport = require("passport");
// Google's OAuth2 client
const OAuth2 = google.auth.OAuth2;
const CONFIG = require("./config");
const youtube = google.youtube("v3");
const oauth2Client = new OAuth2(
  CONFIG.oauth2Credentials.client_id,
  CONFIG.oauth2Credentials.client_secret,
  CONFIG.oauth2Credentials.redirect_uris[0]
);
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const MusicItem = require('./musicItem.js');

// app.use(cors())
// app.use(bodyParser.json())

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/signin/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      oauth2Client.credentials.access_token = accessToken;
      oauth2Client.credentials.refresh_token = refreshToken;
      done(null, profile);
    }
  )
);

passport.use("google-authz",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/connect/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      oauth2Client.credentials.access_token = accessToken;
      oauth2Client.credentials.refresh_token = refreshToken;
      done(null, profile);
    }
  )
);

// oauth2Client.on('tokens', (tokens) => {
//   if (tokens.refresh_token) {
//     // store the refresh_token in your secure persistent database
//     console.log(tokens.refresh_token);
//   }

//   console.log("On tokens event");
//   console.log(tokens.access_token);
// });

module.exports = function (app) {
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );

  app.get('/youtube/clearTokensCache', function (req, res) {
    oauth2Client.credentials.access_token = null;
    oauth2Client.credentials.refresh_token = null;
    res.sendStatus(200);
  });

  app.get('/youtube/refreshToken', (req, res) => {
    oauth2Client.refreshToken(oauth2Client.credentials.refresh_token)
      .then(data => {
        oauth2Client.credentials.access_token = data.tokens.access_token
      })
      .catch(() => {
        res.sendStatus(400)
      })
  })

  app.get('/youtube/popularSongs', function (req, res) {
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
        const sendData = data.data.items.map(item =>
          new MusicItem(item.id,
            item.snippet.title,
            item.snippet.description,
            item.snippet.channelTitle,
            item.snippet.thumbnails.high.url
          ))
        res.send(sendData)
      })
      .catch(e => {
        console.log(e)
      });
  });

  app.get('/youtube/myPlaylists', (req, res) => {
    youtube.playlists
      .list({
        auth: oauth2Client,
        part: "snippet,contentDetails",
        mine: true,
        maxResults: 15
      })
      .then(data => {
        const sendData = data.data.items.map(item =>
          new MusicItem(item.id,
            item.snippet.title,
            item.snippet.description,
            item.snippet.channelTitle,
            item.snippet.thumbnails.high.url
          ))
        res.send(sendData)
      })
      .catch(e => {
        console.log(e)
      });
  })

  app.get('/youtube/randomPlaylists', (req, res) => {
    youtube.playlists
      .list({
        auth: oauth2Client,
        part: "snippet,contentDetails",
        channelId: "UC-9-kyTW8ZkZNDHQJ6FgpwQ", // Music channel Id
        maxResults: 15
      })
      .then(data => {
        const sendData = data.data.items.map(item =>
          new MusicItem(item.id,
            item.snippet.title,
            item.snippet.description,
            item.snippet.channelTitle,
            item.snippet.thumbnails.high.url
          ))
        res.send(sendData)
      })
      .catch(e => {
        console.log(e)
      });
  })

  app.get('/youtube/relatedVideos', (req, res) => {
    youtube.search.list({
      auth: oauth2Client,
      part: "snippet",
      relatedToVideoId: req.body.videoId,
      type: 'video',
      videoCategoryId: 10,
      maxResults: 15,
    })
      .then(data => {
        const sendData = data.data.items.map(item =>
          new MusicItem(item.id,
            item.snippet.title,
            item.snippet.description,
            item.snippet.channelTitle,
            item.snippet.thumbnails.high.url
          ))
        res.send(sendData)
      })
      .catch(e => {
        console.log(e)
      });
  })

  app.get('/youtube/getTrack/:id', (req, res) => {
    youtube.videos.list({
      auth: oauth2Client,
      part: "snippet",
      id: req.params.id,
      videoCategoryId: 10,
      maxResults: 1,
    })
      .then(data => {
        const sendData = data.data.items.map(item =>
          new MusicItem(item.id,
            item.snippet.title,
            item.snippet.description,
            item.snippet.channelTitle,
            item.snippet.thumbnails.high.url
          ))
        res.send(sendData)
      })
      .catch(e => {
        console.log(e)
      });
  })

  app.get('/youtube/search/:query', (req, res) => {
    youtube.search.list({
      auth: oauth2Client,
      part: "snippet",
      type: 'video',
      q: req.params.query,
      videoCategoryId: 10,
      maxResults: 15,
    })
      .then(data => {
        const sendData = data.data.items.map(item =>
          new MusicItem(item.id.videoId,
            item.snippet.title,
            item.snippet.description,
            item.snippet.channelTitle,
            item.snippet.thumbnails.high.url
          ))

        res.send(sendData)
      })
      .catch(e => {
        console.log(e)
      });
  })
}