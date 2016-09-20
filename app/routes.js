var initializeAuth = require('./auth');
var moment = require('moment');
var getUsers = require('./utils/user').getUsers;

module.exports = function(app, passport) {

	initializeAuth(app, passport);
	//home
	app.get('/', function(req, res) {
		return res.render('index.ejs', {user: req.user});
	});

	//login
	app.get('/login', function(req, res) {
		return res.render('login.ejs', {message: req.flash('Logging in')})
	});

	//signup
	app.get('/signup', function(req, res) {
		return res.render('signup.ejs', {message: req.flash('Signing up')})
	});

	//logout
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	//profile
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {user: req.user});
	});

	//Form to record a ride
	app.get('/record-ride', function(req, res) {
		res.render('record-ride.ejs', {user: req.user, moment: moment});
	});

	//Saving ride
	app.post('/save-ride', function(req, res) {
		console.log('req body ' + JSON.stringify(req.body));

		res.redirect('/all-rides')
	})

	app.get('/get-users', function(req, res) {
		getUsers(function(err, users) {
			res.json(users);
		});
	});

	app.get('/all-rides', isLoggedIn, function(req, res) {
		console.log('all rides');
		res.redirect('/profile');
	})
};

function isInstructor(req, res, next) {
	if (req.isAuthenticated() && req.user.instructor) {
		next();
		return;
	}
	res.redirect('/');
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next();
		return;
	}

	console.log();
	res.redirect('/');
}
