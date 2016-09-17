var mongoose = require('mongoose')
var findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
	facebookId:String,
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
	preferredName: String,
	preferredImage: String,
	email: String,
	name: String,
	picture: String

});

userSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', userSchema);