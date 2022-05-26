require('dotenv').config();
const HOST = require('./variables').HOST;
const CLIENT = require('./variables').CLIENT;
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: `${CLIENT}/spotify`,
});
const MusicItem = require('./models/musicItem.js');
const ITEM_LIMIT = 15;
const dbo = require('./db/conn');
const axios = require('axios');

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: `${HOST}/auth/spotify/signin/callback`
    },
    async function (accessToken, refreshToken, expires_in, profile, done) {
      // Set tokens
      spotifyApi.setAccessToken(accessToken)
      spotifyApi.setRefreshToken(refreshToken)

      const user = {
        username: profile.id,
        provider: "spotify",
      }

      const dbConnect = dbo.getDb();
      const existingUser = await dbConnect.collection('users').findOne(user);
      if (existingUser) {
        if (existingUser.linkedAccount) {
          await axios.get(`${HOST}/youtube/setRefreshToken/` + existingUser.linkedAccount.refreshToken)
          await axios.get(`${HOST}/youtube/refreshToken`)
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

passport.use('spotify-authz',
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: `${HOST}/auth/spotify/connect/callback`,
      passReqToCallback: true
    },
    async function (req, accessToken, refreshToken, expires_in, profile, done) {
      // Set tokens
      spotifyApi.setAccessToken(accessToken)
      spotifyApi.setRefreshToken(refreshToken)

      const user = {
        username: profile.id,
        provider: "spotify",
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

module.exports = function (app) {
  app.get('/spotify/clearTokensCache', function (req, res) {
    spotifyApi.setAccessToken(null)
    spotifyApi.setRefreshToken(null)
    res.sendStatus(200);
  });

  app.get('/spotify/setRefreshToken/:refreshToken(*)', (req, res) => {
    spotifyApi.setRefreshToken(req.params.refreshToken)
    res.sendStatus(200)
  });

  app.get('/spotify/refreshToken', (req, res) => {
    spotifyApi.refreshAccessToken()
      .then(data => {
        spotifyApi.setAccessToken(data.body.access_token)
        console.log("Refreshed Spotify access token.")
        res.sendStatus(200)
      })
      .catch((error) => {
        console.log("Cannot refresh access token.")
        console.log(error)
        res.sendStatus(400)
      })
  });

  app.get('/spotify/getInfo', (req, res) => {
    if (!spotifyApi.getAccessToken()) {
      // res.sendStatus(401);
    }

    spotifyApi.getMe()
      .then(data => {
        res.send(data.body)
      })
      .catch((error) => {
        console.log("Cannot get Spotify profile.")
        console.log(error)
        res.sendStatus(400)
      })
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
      })
      .catch(function (err) {
        console.log('Failed to fetch user\'s playlists', err);
        res.sendStatus(503)
      })
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
      })
      .catch(function (err) {
        console.log('Failed to fetch pop playlists', err);
        res.sendStatus(503)
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
      })
      .catch(function (err) {
        console.log('Failed to fetch top playlists', err);
        res.sendStatus(503)
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
      })
      .catch(function (err) {
        console.log('Failed to fetch decades playlists', err);
        res.sendStatus(503)
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
      })
      .catch(function (err) {
        console.log('Failed to fetch mood playlists.', err);
        res.sendStatus(503)
      });
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
      })
      .catch(function (err) {
        console.log('Failed to fetch chill playlists', err);
        res.sendStatus(503)
      });
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
      })
      .catch(function (err) {
        console.log('Failed to fetch featured playlists.', err);
        res.sendStatus(503)
      });
  });

  app.get('/spotify/getTrack/:id', (req, res) => {
    spotifyApi.getTrack(req.params.id)
      .then(function (data) {
        const responseData = data.body;
        const sendData = new MusicItem(responseData.id,
          responseData.name,
          "",
          responseData.artists[0].name,
          responseData.album.images[0]?.url
        )
        console.log(sendData)

        res.send(sendData)
      })
      .catch(function (err) {
        console.log('Failed to fetch top playlists', err);
        res.sendStatus(503)
      });
  })

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
        res.sendStatus(503)
      })
  });
}