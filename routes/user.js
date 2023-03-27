const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const { storeUser, login, loginPage, membersPage, membersPostsPage, membersCategoriesPage, categoriesPost, registerPage, logoutAction } = require('../controller/user');

const { deleteBicycle, editBicycleWeb, editBicycle } = require('../controller/bicycle');

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

router.post('/login', passport.authenticate('local', {
  successRedirect: '/members', 
  failureRedirect:'/login', 
  failureFlash: true
  })
);

router.use('/members', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.username = req.body.email;
    console.log(req.body); // Add this line
    return next();
  }
  res.redirect('/login');
});

router.get('/login', checkNotAuthenticated, loginPage);

router.get('/members', checkAuthenticated, membersPage);

router.get('/members/posts', checkAuthenticated, membersPostsPage);

router.get('/members/categories', checkAuthenticated, membersCategoriesPage);

router.post('/members/categories', checkAuthenticated, categoriesPost);

router.delete('/members/posts/:id', deleteBicycle);

router.get('/members/posts/:id', editBicycleWeb);

router.patch('/members/posts/:id', checkAuthenticated, editBicycle);

router.delete('/logout', logoutAction);



router.get('/register', registerPage);


module.exports = router;
