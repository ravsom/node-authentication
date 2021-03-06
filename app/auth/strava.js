/**
 * Created by rs on 16/09/16.
 */

var StravaStrategy = require('passport-strava').Strategy;
var User = require('../models/user');

const STRAVA_CLIENT_ID = '9769s';
const STRAVA_CLIENT_SECRET = '730a3ffd8d30a165dc2c37fa4630cec15d73efcc';
const STRAVA_CALLBACK = 'http://localhost:8080/auth/strava/callback';

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
				user.name = profile.displayName;
			}
			user.strava.id = profile.id;
			user.strava.token = token;
			user.strava.name = profile.displayName;
			user.strava.email = profile._json.email;
			user.strava.picture = profile._json.profile_medium;
			user.save(function(err) {
				if (err) {
					throw err;
				}

				return done(null, user);
			});
		}
	}

	passport.use(new StravaStrategy({
			clientID: STRAVA_CLIENT_ID,
			clientSecret: STRAVA_CLIENT_SECRET,
			callbackURL: STRAVA_CALLBACK
		},
		function(accessToken, refreshToken, profile, done) {
			console.log('calling from somethwere ' + accessToken + ' profile: ' + JSON.stringify(profile));
			console.log('callback ' + done);

			process.nextTick(function() {
				User.findOne({'strava.id': profile.id}, function(err, user) {
					if (err) {
						return done(err);
					}

					if (user) {
						return done(null, user);
					}

					User.findOne({email: profile._json.email}, function(err, user) {
						if (err) return done(err);

						if (user) {
							return fillAndSaveUserFields(profile, user, accessToken, done);
						}

						const newUser = new User();
						console.log('New user is created.');
						return fillAndSaveUserFields(profile, newUser, accessToken, done);
					})

				})
			});
		}
	));

	app.get('/auth/strava', passport.authenticate('strava'));

	app.get('/auth/strava/callback', passport.authenticate('strava', {
		failureRedirect: '/login',
		successRedirect: '/profile'
	}))

};