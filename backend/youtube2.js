const express = require("express");
const google = require("googleapis").google;
const jwt = require("jsonwebtoken");
const cors = require('cors')

// Google's OAuth2 client
const OAuth2 = google.auth.OAuth2

// Including our config file
const CONFIG = require("./config");

// Creating our express application
const app = express();

// Allowing ourselves to use cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors());

// Setting up Views
app.set("view engine", "ejs");
app.set("views", __dirname);

// app.get("/", function(req, res) {
//   // Create an OAuth2 client object from the credentials in our config file
//   const oauth2Client = new OAuth2(
//     CONFIG.oauth2Credentials.client_id,
//     CONFIG.oauth2Credentials.client_secret,
//     CONFIG.oauth2Credentials.redirect_uris[0]
//   );

//   // Obtain the google login link to which we'll send our users to give us access
//   const loginLink = oauth2Client.generateAuthUrl({
//     access_type: "offline", // Indicates that we need to be able to access data continously without the user constantly giving us consent
//     scope: CONFIG.oauth2Credentials.scopes // Using the access scopes from our config file
//   });
//   console.log(loginLink)
//   return res.render("index", { loginLink: loginLink });
// });

app.get("/login", function(req, res) {
  // Create an OAuth2 client object from the credentials in our config file
  const oauth2Client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  );


  oauth2Client.getToken(req.body.code).then(
    token => {
      res.cookie("googleTokens", jwt.sign(token, CONFIG.JWTsecret));
    },
    err => {
      console.log(err)
    }
  )

  // oauth2Client.getToken(req.query.code, function(err, token) {
  //   // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'
  //   res.cookie("googleTokens", jwt.sign(token, CONFIG.JWTsecret));
  // });
  
  // if (req.query.error) {
  //   // The user did not give us permission.
  //   return res.redirect("/");
  // } else {
  //   oauth2Client.getToken(req.query.code, function(err, token) {
  //     if (err) return res.redirect("/");

  //     // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'
  //     res.cookie("googleTokens", jwt.sign(token, CONFIG.JWTsecret));
  //     // return res.redirect("/get_some_data");
  //   });
  // }
});

app.get("/popularSongs", function(req, res) {
  if (!req.cookies.googleTokens) {
    // We haven't logged in
    return res.redirect("/");
  }

  // Create an OAuth2 client object from the credentials in our config file
  const oauth2Client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  );

  // Add this specific user's credentials to our OAuth2 client
  oauth2Client.credentials = jwt.verify(req.cookies.googleTokens, CONFIG.JWTsecret);

  // Get the youtube service
  const service = google.youtube("v3");

  service.videos
    .list({
      auth: oauth2Client,
      chart: 'mostPopular',
      part: "id,snippet",
      videoCategoryId: 10,
      regionCode: "CA",
      maxResults: 5
    })
    .then(response => {
      //console.log(response.data.items)
      console.log(response.data.items[0].snippet.resourceId)
      //console.log(response.data.items[0].snippet.thumbnails.medium.url)
      // Render the data view, passing the subscriptions to it
      res.send(response)
    });
});

// Listen on the port defined in the config file
app.listen(CONFIG.port, function() {
  console.log(`Listening on port ${CONFIG.port}`);
});
