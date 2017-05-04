'use strict';
require('dotenv').config();


module.exports = {
	'twitterAuth': {
		'clientID': process.env.TWITTER_KEY,
		'clientSecret': process.env.TWITTER_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/twitter/callback'
	},
	'yelpAuth':{
		'clientID': process.env.YELP_CLIENT_ID,
		'clientSecret': process.env.YELP_CLIENT_SECRET
	}
};
