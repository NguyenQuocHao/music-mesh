require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});
const MusicItem = require('./musicItem.js');
const ITEM_LIMIT = 15;

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
        const sendData = data.body.items.map(item =>
          new MusicItem(item.id,
            item.name,
            item.description,
            item.owner.display_name,
            item.images[0]?.url
          ))

        res.send(sendData)
      }, function (err) {
        console.log('Failed to fetch user\'s playlists', err);
      })
      .catch(e => {
        console.log(e)
      });
  });

  app.get('/spotify/pop', (req, res) => {
    spotifyApi.getPlaylistsForCategory('pop', { limit: ITEM_LIMIT })
      .then(function (data) {
        const sendData = data.body.playlists.items.map(item =>
          new MusicItem(item.id,
            item.name,
            item.description,
            item.owner.display_name,
            item.images[0]?.url
          ))

        res.send(sendData)
      }, function (err) {
        console.log('Failed to fetch pop playlists', err);
      })
      .catch(e => {
        console.log(e)
      });
  })

  app.get('/spotify/topLists', (req, res) => {
    spotifyApi.getPlaylistsForCategory('toplists', { limit: ITEM_LIMIT })
      .then(function (data) {
        const sendData = data.body.playlists.items.map(item =>
          new MusicItem(item.id,
            item.name,
            item.description,
            item.owner.display_name,
            item.images[0]?.url
          ))

        res.send(sendData)
      }, function (err) {
        console.log('Failed to fetch top playlists', err);
      })
      .catch(e => {
        console.log(e)
      });
  })

  app.get('/spotify/decades', (req, res) => {
    spotifyApi.getPlaylistsForCategory('decades', { limit: ITEM_LIMIT })
      .then(function (data) {
        const sendData = data.body.playlists.items.map(item =>
          new MusicItem(item.id,
            item.name,
            item.description,
            item.owner.display_name,
            item.images[0]?.url
          ))

        res.send(sendData)
      }, function (err) {
        console.log('Failed to fetch decades playlists', err);
      })
      .catch(e => {
        console.log(e)
      });
  })

  app.get('/spotify/mood', (req, res) => {
    spotifyApi.getPlaylistsForCategory('mood', { limit: ITEM_LIMIT })
      .then(function (data) {
        const sendData = data.body.playlists.items.map(item =>
          new MusicItem(item.id,
            item.name,
            item.description,
            item.owner.display_name,
            item.images[0]?.url
          ))

        res.send(sendData)
      }, function (err) {
        console.log('Failed to fetch mood playlists.', err);
      })
  })

  app.get('/spotify/chill', function (req, res) {
    spotifyApi.getPlaylistsForCategory('chill', { limit: ITEM_LIMIT })
      .then(function (data) {
        const sendData = data.body.playlists.items.map(item =>
          new MusicItem(item.id,
            item.name,
            item.description,
            item.owner.display_name,
            item.images[0]?.url
          ))

        res.send(sendData)
      }, function (err) {
        console.log('Failed to fetch chill playlists', err);
      })
  });

  app.get('/spotify/featuredPlaylists', function (req, res) {
    spotifyApi.getFeaturedPlaylists({ limit: ITEM_LIMIT })
      .then(function (data) {
        const sendData = data.body.playlists.items.map(item =>
          new MusicItem(item.id,
            item.name,
            item.description,
            item.owner.display_name,
            item.images[0]?.url
          ))

        res.send(sendData)
      }, function (err) {
        console.log('Failed to fetch featured playlists.', err);
      })
  });

  app.get('/spotify/search/:query', function (req, res) {
    spotifyApi.search(req.params.query, ['track', 'playlist'], { limit: ITEM_LIMIT })
      .then(function (data) {
        const tracks = data.body.tracks.items.map(item =>
          new MusicItem(item.id,
            item.name,
            item.description,
            item.album.artists[0].name,
            item.album.images[0].url
          ))

        const playlists = data.body.playlists.items.map(item =>
          new MusicItem(item.id,
            item.name,
            item.description,
            item.owner?.display_name,
            item.images[0]?.url
          ))

        const sendData = {
          tracks,
          playlists,
        }

        res.send(sendData)
      })
      .catch(err => {
        console.log('Failed to fetch featured playlists.', err);
      })
  });
}