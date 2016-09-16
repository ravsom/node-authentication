module.exports = function(app, passport) {

	//home
	app.get('/', function(req, res) {
		return res.render('index.ejs');
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
	app.get('/profile', isLoggedIn, function(req, res, next) {
		res.render('profile.ejs', {user: req.user});
	})
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next;

	res.redirect('/');
}
