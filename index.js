const express = require("express"); // common js module
const mongoose = require("mongoose"); // connect mongoose
const keys = require("./config/keys");
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser'); // another middleware
const passport = require('passport'); // tell passport to use cookie session
// to import express by using require keyword
// import express from 'express';
// yes 2015 module and node won't support easily

// need to register model first before require it in passport
require("./models/User");
// require passport.js file to execute
// we don't need to pull out the code in it
// we just need it to execute
// so don't need to add export in passport.js
// and don't need to assign it to anything
// const passportConfig = require('./services/passport');
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express(); // a new app

// these four app.use() are to wire up middlewares
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds before cookie expires
		keys: [keys.cookieKey] // use to encrypt the cookie
	})
)
app.use(bodyParser.json());
// initialize then begin the cookie session
app.use(passport.initialize());
app.use(passport.session());

// require authRoutes and return what is inclued in the exports
// which is an arrow function needing to take in app
// this line execute the authRoutes
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if(process.env.NODE_ENV === 'production') {
	// Express will serve up prod assets
	// like the main.js file or main.css file
	app.use(express.static('client/build'));

	// Express will serve up the index.html file
	// if it doesn't recognize the route	
	const path = require('path');
	app.get('*', (req,res) => {
		res.sendFile(path.resolve(__dirname, 'client','build', index.html));
	});
}

// environment variable
// figure out what Heroku provides
// or when running on our machine, listen to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
