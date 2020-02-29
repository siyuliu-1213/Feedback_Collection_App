// require the original passport library
const passport = require("passport");

// need to get access to app initialized in index.js
module.exports = app => {
	// a single route handler
	// string google is set internally in the Google Strategy
	// when call passport.authenticate on google
	// it will know to employ google strategy
	// scope array is used to indicate what we need to access
	// inside the user's account, the name is defined
	// in scopes of google authentication
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"]
		})
	);

	app.get('/api/logout', (req, res) => {
		// logout will kill the cookie in req object
		// and send back to res to client
		req.logout();
		res.redirect('/');
	})

	// a second route handler to handle the code we get from google
	// passport will do that for us
	app.get(
		"/auth/google/callback", 
		passport.authenticate("google"),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	// test router handler
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
