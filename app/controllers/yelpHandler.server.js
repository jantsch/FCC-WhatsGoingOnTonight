'use strict';
var configAuth = require('../config/auth.js');
var yelp = require('../config/yelpService.js');

function YelpHandler () {

	this.getPlaces = function (req, res) {
		yelp.searchPlaces(req.query.location).then(function(data)
			{
				res.json(data);

			});
		//res.json(yelp.searchPlaces(req.query.location));
			

}}

module.exports = YelpHandler;
