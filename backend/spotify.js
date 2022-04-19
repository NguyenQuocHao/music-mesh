require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport')
const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})
const ITEM_LIMIT = 5

const app = express();
app.use(cors())
app.use(bodyParser.json())

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/spotify/signin/callback'
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      spotifyApi.setAccessToken(accessToken)
      spotifyApi.setRefreshToken(refreshToken)
      // spotifyApi.expiresIn = expires_in

      done(null, profile);
    }
  )
);

passport.use('spotify-authz',
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/spotify/connect/callback'
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      spotifyApi.setAccessToken(accessToken)
      spotifyApi.setRefreshToken(refreshToken)
      // spotifyApi.expiresIn = expires_in

      done(null, profile);
    }
  )
);



app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken
  })

  spotifyApi.refreshAccessToken().
    then(
      data => {
        res.json({
          accessToken: data.body.accessToken,
          expiresIn: data.body.expiresIn
        })
        console.log("The access token has been refreshed.")
      })
    .catch(() => {
      res.sendStatus(400)
    })
})

module.exports = function (app) {
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );

  app.get('/spotify/clearTokensCache', function (req, res) {
    spotifyApi.setAccessToken(null)
    spotifyApi.setRefreshToken(null)
    res.sendStatus(200);
  });

  app.get('/spotify/userPlaylists', function (req, res) {
    spotifyApi.getUserPlaylists()
      .then(function (data) {
        res.send(data.body.items)
      }, function (err) {
        console.log('Something went wrong!', err);
      })
      .catch(e => {
        console.log(e)
      });
  });

  app.get('/spotify/pop', (req, res) => {
    spotifyApi.getPlaylistsForCategory('pop', { limit: ITEM_LIMIT })
      .then(function (data) {
        res.send(data.body.playlists.items)
      }, function (err) {
        console.log('Something went wrong!', err);
      })
      .catch(e => {
        console.log(e)
      });
  })

  app.get('/spotify/topLists', (req, res) => {
    spotifyApi.getPlaylistsForCategory('toplists', { limit: ITEM_LIMIT })
      .then(function (data) {
        res.send(data.body.playlists.items)
      }, function (err) {
        console.log('Something went wrong!', err);
      })
      .catch(e => {
        console.log(e)
      });
  })

  app.get('/spotify/decades', (req, res) => {
    spotifyApi.getPlaylistsForCategory('decades', { limit: ITEM_LIMIT })
      .then(function (data) {
        res.send(data.body.playlists.items)
      }, function (err) {
        console.log('Something went wrong!', err);
      })
      .catch(e => {
        console.log(e)
      });
  })

  app.get('/spotify/mood', (req, res) => {
    spotifyApi.getPlaylistsForCategory('mood', { limit: ITEM_LIMIT })
      .then(function (data) {
        res.send(data.body.playlists.items)
      }, function (err) {
        console.log('Something went wrong!', err);
      })
  })

  app.get('/spotify/chill', function (req, res) {
    spotifyApi.getPlaylistsForCategory('chill', { limit: ITEM_LIMIT })
      .then(function (data) {
        res.send(data.body.playlists.items)
      }, function (err) {
        console.log('Something went wrong!', err);
      })
  });

  app.get('/spotify/featuredPlaylists', function (req, res) {
    spotifyApi.getFeaturedPlaylists({ limit: ITEM_LIMIT })
      .then(function (data) {
        res.send(data.body.playlists.items)
      }, function (err) {
        console.log('Something went wrong!', err);
      })
  });
}
// app.listen(8000, () => console.log(`Server running at localhost: ${8000}!`))