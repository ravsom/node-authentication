var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
	preferredName: String,
	preferredImage: String,
	email: String,
	name: String,
	picture: String,
	dob: String,
	instructor: {
		type: Boolean,
		default: false
	},
	approved: {
		type: Boolean,
		default: false
	},
	facebook: {
		id: String,
		token: String,
		name: String,
		img: String
	},
	google: {
		id: String,
		token: String,
		name: String,
		img: String
	},

	strava: {
		id: String,
		token: String,
		name: String,
		img: String
	},
	fitbit: {
		id: String,
		token: String,
		name: String,
		img: String
	},

	jawbone: {
		id: String,
		token: String,
		name: String,
		img: String
	},
	created: {
		type: Date,
		default: Date.now,
		required: true
	},
	updated: {
		type: Date,
		default: Date.now,
		required: true
	},
	banned: {
		type: Boolean,
		default: false
	},
	admin: {
		type: Boolean,
		default: false
	}
});

userSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', userSchema);