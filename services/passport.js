const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys"); // ask for keys
const mongoose = require("mongoose");
// clientID
// clientSecret

const User = mongoose.model("users");

passport.serializeUser((user, done)=> {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		(accessToken, refreshToken, profile, done) => {
			// return a promise
			// existingUser is the model instance that found by these conditions
			// equals to null if isn't found
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					// we have a record with the given profile ID
					// done() function to indicate we are done
					// first parameter is an error method, null means no error
					// second returns the instance we found
					done(null, existingUser);
				} else {
					// create an instance of User model class
					// persist into db by calling .save()
					// call .then() as this is asynchronize process
					// we need to make sure that the user is created
					// then we can call done()
					// the user input parameter for then is different
					// from the User, user is what we just fetched from the db
					// but they theoretically refer to the same instance
					new User({ googleId: profile.id })
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
);
