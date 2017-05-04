
var configAuth = require('./auth');
//var Yelp = require('yelpv3');
const yelp = require('yelp-fusion');

var client;

const token = yelp.accessToken(configAuth.yelpAuth.clientID, configAuth.yelpAuth.clientSecret).then(response => {
  client = yelp.client(response.jsonBody.access_token);
}).catch(e => {
  console.log(e);
});


var yalp = {
	searchPlaces: function(city){
			return client.search({
				  location: city
				}).then(response => {				  
				  return response.jsonBody.businesses;
				}).catch(e => {
				  console.log(e);
				});

	}

}

module.exports = yalp;


