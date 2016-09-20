const User = require('../models/user');

function getUsers(callback) {
	User.find({}).select({name: 1, _id: 1, picture: 1, instructor: 1}).exec(callback);
}

module.exports = {
	getUsers: getUsers
}