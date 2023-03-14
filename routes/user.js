const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const { storeUser, login, loginPage, membersPage, registerPage, logoutAction } = require('../controller/user');

router.post('/user', storeUser);

// passport.use(new LocalStrategy(async (email,password,done) => {
//   // const {email, password} = req.body;
//   console.log(email);



//   const user = await User.findOne({email});

//   if (!user) {
//     return res.status(401).json({
//       success: false,
//       message: 'Invalid Email/password',
//     });
//   }
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(401).json({
//       success: false,
//       message: 'Invalid Email/password',
//     });
//   }
//     return res.status(200).json({
//       success: true,
//       user,
//     });
// }));
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/members');
  }

  next();

}

router.post('/login', passport.authenticate('local', {successRedirect: '/members', failureRedirect:'/login', failureFlash: true}));

router.get('/login', checkNotAuthenticated, loginPage);

router.get('/members', checkAuthenticated, membersPage);

router.delete('/logout', logoutAction);



router.get('/register', registerPage);


module.exports = router;
