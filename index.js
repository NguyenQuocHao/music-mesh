require('dotenv').config()
const cookieSession = require("cookie-session");
const cookieParser = require('cookie-parser');
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
const youtube = require("./youtube")(app)
const spotify = require("./spotify")(app)
const dbo = require('./db/conn');
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(cookieParser());

app.use(
  // cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 }),
  cookieSession({ name: "domixi", keys: ["test", "test2"], maxAge: 24 * 60 * 60 * 100 })
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

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
});

app.use(express.static(path.join(__dirname, 'client/build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
