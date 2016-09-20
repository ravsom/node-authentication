var mongoose = require('mongoose');
var MusicTrack = require('./music-track');
var User = require('./user');

var Schema = mongoose.Schema;
const rideSchema = mongoose.Schema({

	attendees: [{
		type: Schema.ObjectId,
		ref: User
	}],
	tracks: [
		{
			type: Schema.ObjectId,
			ref: MusicTrack
		}
	],
	created: {
		type: Date,
		default: Date.now,
		required: true
	},
	updated: {
		type: Date,
		default: Date.now,
		required: true
	}
});


module.exports = mongoose.model('Ride', rideSchema);