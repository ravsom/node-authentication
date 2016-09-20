/**
 * Created by rs on 16/09/16.
 */

var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
var User = require('../models/user');

const FITBIT_CLIENT_ID = '227Z68';
const FITBIT_CLIENT_SECRET = '1ef956161ef3f39d9de22d37a1db3b4f';
const FITBIT_CALLBACK = 'http://localhost:8080/auth/fitbit/callback';

module.exports = function(app, passport) {

	passport.serializeUser(function(user, done) {
		return done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {

		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	function fillAndSaveUserFields(profile, user, token, done) {
		if (user) {

			if (!user.name) {
				user.name = profile._json.user.fullName;
			}
			user.fitbit.id = profile.id;
			user.fitbit.token = token;
			user.fitbit.name = profile._json.user.fullName;
			user.dob = profile._json.user.dateOfBirth;
			user.save(function(err) {
				if (err) {
					throw err;
				}

				return done(null, user);
			});
		}
	}

	passport.use(new FitbitStrategy({
			clientID: FITBIT_CLIENT_ID,
			clientSecret: FITBIT_CLIENT_SECRET,
			callbackURL: FITBIT_CALLBACK,
			profileFields: ['id', 'displayName', 'photos', 'email']
		},
		function(accessToken, refreshToken, profile, done) {
			console.log('callback ' + done);

			process.nextTick(function() {
				User.findOne({'fitbit.id': profile.id}, function(err, user) {
					if (err) {
						return done(err);
					}

					if (user) {
						return done(null, user);
					}

					const newUser = new User();
					console.log('New user is created.');
					return fillAndSaveUserFields(profile, newUser, accessToken, done);
				})
			});
		}
	));

	app.get('/auth/fitbit', passport.authenticate('fitbit', {scope: ['activity', 'heartrate', 'location', 'profile']}));

	app.get('/auth/fitbit/callback', passport.authenticate('fitbit', {
		failureRedirect: '/login',
		successRedirect: '/profile'
	}))

};