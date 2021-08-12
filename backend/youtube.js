require('dotenv').config()
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const google = require("googleapis").google;

// Google's OAuth2 client
const OAuth2 = google.auth.OAuth2
const CONFIG = require("./config");
const youtube = google.youtube("v3");
const app = express();
const oauth2Client = new OAuth2(
  CONFIG.oauth2Credentials.client_id,
  CONFIG.oauth2Credentials.client_secret,
  CONFIG.oauth2Credentials.redirect_uris[0]
);
var code;

app.use(cors())
app.use(bodyParser.json())

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "PUT, PATCH, DELETE");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// })

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

app.post('/login', (req, res) => {
  code = req.body.code // or req.query.code
  console.log("Body: " + req.body)

  oauth2Client.getToken(code).then(data => {
    oauth2Client.credentials = data.tokens;
    console.log("Credentials set!")
    console.log(oauth2Client.access_token)
    console.log(oauth2Client.credentials.access_token)

    res.json(
      {
        accessToken: data.tokens.access_token,
        refreshToken: data.tokens.refresh_token,
        expiresIn: data.tokens.expiry_date,
      }
    )
  })
    .catch(error => {
      console.log(error)
      res.sendStatus(400)
    })
})

app.get('/popularSongs', function (req, res) {
  youtube.videos
    .list({
      auth: oauth2Client,
      chart: 'mostPopular',
      part: "id,snippet",
      videoCategoryId: 10,
      regionCode: "CA",
      maxResults: 5
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
    maxResults: 5
  })
  .then(data => {
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
    maxResults: 5
  })
  .then(data => {
    res.send(data.data.items)
  })
  .catch(e => {
    console.log(e)
  });
})

app.listen(8001, () => console.log(`Server running at localhost: ${8001}!`))