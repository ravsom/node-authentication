/**
 * Created by rs on 17/09/16.
 */

var facebook = require('./facebook');
var strava = require('./strava');
var fitbit = require('./fitbit')

const initializeAuthRoutes = function(app, passport) {
	facebook(app, passport);
	strava(app, passport);
	fitbit(app, passport);
};

module.exports = initializeAuthRoutes;