require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const google = require("googleapis").google;
const passport = require("passport");
// Google's OAuth2 client
const OAuth2 = google.auth.OAuth2
const CONFIG = require("./config");
const youtube = google.youtube("v3");
const oauth2Client = new OAuth2(
  CONFIG.oauth2Credentials.client_id,
  CONFIG.oauth2Credentials.client_secret,
  CONFIG.oauth2Credentials.redirect_uris[0]
);
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// app.use(cors())
// app.use(bodyParser.json())

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

// app.post('/refresh', (req, res) => {
//   const refreshToken = req.body.refreshToken
//   const spotifyApi = new SpotifyWebApi({
//     redirectUri: process.env.REDIRECT_URI,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     refreshToken
//   })

//   spotifyApi.refreshAccessToken().
//     then(
//       data => {
//         res.json({
//           accessToken: data.body.accessToken,
//           expiresIn: data.body.expiresIn
//         })
//         console.log("The access token has been refreshed.")
//       })
//     .catch(() => {
//       res.sendStatus(400)
//     })
// })

module.exports = function (app) {
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );

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
        res.send(data.data.items)
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
        res.send(data.data.items)
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
        res.send(data.data.items)
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
        res.send(data.data.items)
      })
      .catch(e => {
        console.log(e)
      });
  })
}
// app.listen(8001, () => console.log(`Server running at localhost: ${8001}!`))