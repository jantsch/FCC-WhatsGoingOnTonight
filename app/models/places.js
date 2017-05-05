'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Places = new Schema({
	id: String,
	attendance:[
		{
			id_user: String
		}
	],
	attendance_number: {type:Number, default: 0}
});

module.exports = mongoose.model('Places', Places);
