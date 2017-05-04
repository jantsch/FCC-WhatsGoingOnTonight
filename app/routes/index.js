'use strict';

var path = process.cwd();
var YelpHandler = require(path + '/app/controllers/yelpHandler.server.js');

module.exports = function (app, passport) {

	var yelpHandler = new YelpHandler();

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/auth/twitter');
		}
	}

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});


	
	app.route('/api/:id')
		.post(isLoggedIn,function (req, res) {
				res.json(req.user.twitter);			
		});


	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/places')
		.get(yelpHandler.getPlaces);

	app.route('/api/place/:id')
		.post(isLoggedIn,function(req,res){
				res.redirect('/')

		});		
};
