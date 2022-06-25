require('dotenv').config();
const HOST = require('./variables').HOST;
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const google = require("googleapis").google;
const cloudSearch = google.cloudsearch("v1");
const customSearch = google.searchconsole("v1");
customSearch.context
const youtube = google.youtube("v3");
const oauth2Client = new google.auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
});
oauth2Client.apiKey = process.env.GOOGLE_API_KEY;

const MusicItem = require('./models/musicItem.js');
const dbo = require('./db/conn');
const axios = require('axios');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${HOST}/auth/google/signin/callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
      // Set tokens
      oauth2Client.credentials.access_token = accessToken;
      oauth2Client.credentials.refresh_token = refreshToken;

      const user = {
        username: profile.id,
        provider: "google",
      }

      const dbConnect = dbo.getDb();
      const existingUser = await dbConnect.collection('users').findOne(user);
      if (existingUser) {
        if (existingUser.linkedAccount) {
          await axios.get(`${HOST}/spotify/setRefreshToken/` + existingUser.linkedAccount.refreshToken)
          await axios.get(`${HOST}/spotify/refreshToken`)
        }
      }
      else {
        const returnedUser = await dbConnect
          .collection('users')
          .insertOne(user);
        console.log("Created user with id:" + returnedUser.insertedId)
      }

      done(null, profile);
    }
  )
);

passport.use("google-authz",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${HOST}/auth/google/connect/callback`,
      passReqToCallback: true
    },
    async function (req, accessToken, refreshToken, profile, done) {
      // Set tokens
      oauth2Client.credentials.access_token = accessToken;
      oauth2Client.credentials.refresh_token = refreshToken;

      const user = {
        username: profile.id,
        provider: "google",
      }

      const dbConnect = dbo.getDb();
      // Find main user, and add 2nd account
      const existingUser = await dbConnect.collection('users').findOne({ username: req.user.id });
      if (existingUser) {
        const update = {
          $set: {
            linkedAccount: {
              ...user,
              refreshToken: refreshToken,
            }
          },
        };

        const result = await dbConnect.collection('users').updateOne({ username: req.user.id }, update);
        console.log("Add linked account for user with id:" + req.user.id)
      }
      else {
        // TODO: Handle error
      }

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
  app.get('/youtube/getInfo', (req, res) => {
    if (!oauth2Client.credentials.access_token) {
      // res.sendStatus(401);
    }

    var oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2'
    })

    oauth2.userinfo.get()
      .then((result) => {
        res.send(result.data)
      })
      .catch(error => {
        console.log(error)
        res.sendStatus(400)
      })
  });

  app.get('/youtube/clearTokensCache', function (req, res) {
    oauth2Client.credentials.access_token = null;
    oauth2Client.credentials.refresh_token = null;
    res.sendStatus(200);
  });

  app.get('/youtube/setRefreshToken/:refreshToken(*)', (req, res) => {
    oauth2Client.credentials.refresh_token = req.params.refreshToken;
    res.sendStatus(200)
  });

  app.get('/youtube/refreshToken', (req, res) => {
    oauth2Client.refreshToken(oauth2Client.credentials.refresh_token)
      .then(data => {
        oauth2Client.credentials.access_token = data.tokens.access_token
        console.log("Refreshed Youtube access token.")
        res.sendStatus(200)
      })
      .catch(() => {
        res.sendStatus(400)
      })
  })

  app.get('/youtube/suggest/:query', function (req, res) {
    const GOOGLE_AC_URL = 'https://clients1.google.com/complete/search'; // or 'http://suggestqueries.google.com/complete/search';

    axios({
      url: GOOGLE_AC_URL,
      // adapter: jsonpAdapter,
      params: {
        client: "youtube",
        hl: "en",
        ds: "yt",
        q: req.params.query,
      }
    })
      .then((data) => {
        const subString = data.data.substring(data.data.indexOf('(') + 1, data.data.length - 1)
        const parsedResult = JSON.parse(subString)[1];
        const result = parsedResult.map(item => item[0]);
        res.send(result)
      })
      .catch(err => {
        console.log("Failed to fetch search suggestions.")
        console.log(err)
      })
  });

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
        console.log("Failed to fetch Youtube's popular songs.")
        console.log(e)
        res.sendStatus(503)
      });
  });

  app.get('/youtube/myPlaylists', (req, res) => {
    youtube.playlists
      .list({
        auth: oauth2Client,
        part: "snippet,contentDetails",
        mine: true,
        maxResults: 50
      })
      .then(data => {
        const sendData = data.data.items.map(item =>
          new MusicItem(item.id,
            item.snippet.title,
            item.snippet.description,
            item.snippet.channelTitle,
            item.snippet.thumbnails.high?.url
          ))
        res.send(sendData)
      })
      .catch(e => {
        console.log("Failed to fetch user's Youtube playlists.")
        console.log(e)
        res.sendStatus(503)
      });
  })

  app.get('/youtube/getPlaylistTracks/:playlistId', (req, res) => {
    youtube.playlistItems
      .list({
        auth: oauth2Client,
        part: "snippet,contentDetails",
        playlistId: req.params.playlistId,
        maxResults: 50
      })
      .then(data => {
        const sendData = data.data.items.map(item =>
          new MusicItem(item.contentDetails.videoId,
            item.snippet.title,
            item.snippet.description,
            item.snippet.channelTitle,
            item.snippet.thumbnails.high?.url
          ))
        res.send(sendData)
      })
      .catch(e => {
        console.log("Failed to fetch Youtube playlist's items.")
        console.log(e)
        res.sendStatus(503)
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
        console.log("Failed to fetch Youtube's random playlists.")
        console.log(e)
        res.sendStatus(503)
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
        console.log("Failed to fetch Youtube's related videos.")
        console.log(e)
        res.sendStatus(503)
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
        const sendData = new MusicItem(data.data.items[0].id,
          data.data.items[0].snippet.title,
          data.data.items[0].snippet.description,
          data.data.items[0].snippet.channelTitle,
          data.data.items[0].snippet.thumbnails.high.url
        )
        res.send(sendData)
      })
      .catch(e => {
        console.log("Failed to fetch Youtube's video with id.")
        console.log(e)
        res.sendStatus(503)
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
        console.log("Failed to fetch Youtube's videos with search query.")
        console.log(e)
        res.sendStatus(503)
      });
  })
}