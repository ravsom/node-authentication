var mongoose = require('mongoose');

const requestingUserSchema = mongoose.Schema({
	provider: String,
	token: String,
	fullName: String,
	email: String,
	profileId: String
});

module.exports = mongoose.model('ReqUser', requestingUserSchema);
