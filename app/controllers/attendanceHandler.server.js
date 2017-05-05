'use strict';
var configAuth = require('../config/auth.js');
var Places = require('../models/places.js');

function AttHandler () {

	this.sign = function (req, res) {
		
		Places.findOne({id: req.body.city},function(err,place){
				 if (err) console.log(err);
				 else
				 {	
				 	if(place != null)
				 	{
				 			var index =  place.attendance.findIndex(function(element){
						 		return element.id_user == req.user.id;
						 	});
						 	if(index == -1)
						 	{	
				 			
						 		place.attendance_number++;
						 		place.attendance.push({"id_user":req.user.id });
						 	}
						 	else
						 	{
								place.attendance_number--;
						 		place.attendance.splice(index,1);
						 	}
				 	}
				 	else
				 	{

				 			var place = new Places();
					 		place.id = req.body.city;
					 		place.attendance_number++;
							place.attendance.push({"id_user":req.user.id });
				 	}
					
					place.save(function (err) {
								  if (err) console.log(err);
								  // saved!
								  res.json({"attendance": place.attendance_number});
								})
				}


		})


}}

module.exports = AttHandler;