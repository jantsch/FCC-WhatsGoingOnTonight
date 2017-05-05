'use strict';

var path = process.cwd();
var YelpHandler = require(path + '/app/controllers/yelpHandler.server.js');
var AttendanceHandler = require(path + '/app/controllers/attendanceHandler.server.js');


module.exports = function (app, passport) {

	var yelpHandler = new YelpHandler();
	var attendanceHandler = new	AttendanceHandler();

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
		 	res.status(401).send('Login');
		}
	}

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
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

	app.route('/api/place/')
		.post(isLoggedIn, attendanceHandler.sign);		
};
