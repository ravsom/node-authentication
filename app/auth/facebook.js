/**
 * Created by rs on 16/09/16.
 */

var FacebookStrategy = require('passport-facebook');
var User = require('../models/user');

const FACEBOOK_CLIENT_ID = '1542301339403468';
const FACEBOOK_CLIENT_SECRET = 'b2f18e4923a1526f7d89f7019c0f6715';
const FACEBOOK_CALLBACK = 'http://localhost:8080/auth/facebook/callback';

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
			user.facebook.id = profile.id;
			user.facebook.token = token;
			user.facebook.name = profile.displayName;
			user.facebook.email = profile.emails[0].value;
			user.save(function(err) {
				if (err) {
					throw err;
				}

				return done(null, user);
			});
		}
	}

	passport.use(new FacebookStrategy({
			clientID: FACEBOOK_CLIENT_ID,
			clientSecret: FACEBOOK_CLIENT_SECRET,
			callbackURL: FACEBOOK_CALLBACK,
			profileFields: ['id', 'displayName', 'photos', 'email']
		},
		function(accessToken, refreshToken, profile, done) {
			console.log('calling from somethwere ' + accessToken + '  refre  ' + refreshToken + ' profile: ' + JSON.stringify(profile));
			console.log('callback ' + done);

			process.nextTick(function() {
				User.findOne({'facebook.id': profile.id}, function(err, user) {
					if (err) {
						return done(err);
					}

					if (user) {
						return done(null, user);
					}

					User.findOne({email: profile.emails[0].value}, function(err, user) {
						if (err) return done(err);

						if (user) {
							console.log('User is : ' + JSON.stringify(user));
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

	app.get('/auth/facebook', passport.authenticate('facebook'));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		failureRedirect: '/login',
		successRedirect: '/profile'
	}))

};