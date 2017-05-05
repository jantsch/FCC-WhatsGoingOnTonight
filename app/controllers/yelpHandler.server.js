'use strict';
var configAuth = require('../config/auth.js');
var yelp = require('../config/yelpService.js');
var Places = require('../models/places.js');
function YelpHandler () {

	this.getPlaces = function (req, res) {
		var ctr =0;
		yelp.searchPlaces(req.query.location).then(function(data)
			{
				data.forEach(function(element){
						Places.findOne({"id": element.id},function(err,place){
								if(err) console.log(err);
								else
									element.attendance_number = place != null ? place.attendance_number: 0;
					
								ctr++;
							
								if(20 == ctr)
								{
									res.json(data);

								}
						})
				})
			});

}}

module.exports = YelpHandler;
