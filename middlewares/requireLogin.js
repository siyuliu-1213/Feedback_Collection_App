module.exports = (req, res, next) => {
	if(!req.user) {
		return res.status(401).send({error: 'You must log in!'});
	}

	// when everything is good, go to next middleware
	next();
};