const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const pool = require('../datebase')
const helpers = require('../lib/helpers')

passport.use('local.signin', new localStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, async(req, username, password, done) =>{
	// console.log(`username: ${username} - password: ${password}`)
	// console.log(req.body)	
	const rows = await pool.query('SELECT * FROM mstuser WHERE username = ?', [username]);	
	if(rows.length > 0){
		const user = rows[0];
		const validPassword = await helpers.matchPassword(password, user.password);
		if(validPassword){
			done(null, user, req.flash('success','Welcome' + user.username));
		}else{
			done(null, false, req.flash('message','Incorrect Password'));			
		}
	}else{
		return done(null, false, req.flash('message','The username does not exists'));		
	}
}));

passport.use('local.signup', new localStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, username, password, done) => {
	const { fullname } = req.body;
	const newUser = {
		username,
		password,
		fullname
	}
	newUser.password = await helpers.encrypPassword(password);
	const result = await pool.query('INSERT INTO mstuser SET ?', [newUser])
	newUser.id = result.insertId;
	return done(null, newUser);
}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const rows = await pool.query('SELECT * FROM mstuser WHERE id = ?', [id]);
	done(null, rows[0]);
})