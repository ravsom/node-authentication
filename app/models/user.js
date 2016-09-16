import mongoose from 'mongoose';

import bcrypt from 'bcrypt-nodejs'

const userSchema = mongoose.Schema({

	facebook: {
		id: String,
		token: String,
		email: String,
		name: String,
		img: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		name: String,
		img: String
	},

	strava: {
		id: String,
		token: String,
		email: String,
		name: String,
		img: String
	},
	fitbit: {
		id: String,
		token: String,
		email: String,
		name: String,
		img: String
	},

	jawbone: {
		id: String,
		token: String,
		email: String,
		name: String,
		img: String
	},
	garmin: {
		id: String,
		token: String,
		email: String,
		name: String,
		img: String
	},
	preferredName: String,
	preferredImage: String

});

module.exports = mongoose.model('User', userSchema);