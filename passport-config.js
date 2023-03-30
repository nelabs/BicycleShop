const LocalStrategy = require('passport-local').Strategy
const User = require('./model/User');
const bcrypt = require('bcryptjs');


function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({email});
      if (user == null) {
        return done(null, false, { message: 'No user with that email' })
      }

      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect'})
        }
      } catch (e) {
        return done(e)
      }
  }
 
  passport.use(new LocalStrategy({ usernameField: 'email'},
  authenticateUser));

  passport.serializeUser((user,done) => {
    console.log('user serialized ', user.id)
    done(null, user.id)
  });
  passport.deserializeUser((id,done) => {
    done(null, getUserById(id))
  })
}


module.exports = initialize;

