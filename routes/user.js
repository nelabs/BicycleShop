const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
const path = require('path');

const { storeUser, login, loginPage, membersPage, membersPostsPage, membersCommentsPage, membersCategoriesPage, membersUsersPage, categoriesPost, categoriesDelete, registerPage, logoutAction, membersAddItemPage, membersAddItem, getImage, deleteImage } = require('../controller/user');

const { deleteBicycle, editBicycleWeb, editBicycle } = require('../controller/bicycle');

const { deleteComment } = require('../controller/comment');



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
    // console.log(req.body); // Add this line
    return next();
  }
  res.redirect('/login');
});

router.get('/login', checkNotAuthenticated, loginPage);

router.get('/members', checkAuthenticated, membersPage);

router.get('/members/posts', checkAuthenticated, membersPostsPage);

router.get('/members/categories', checkAuthenticated, membersCategoriesPage);

router.post('/members/categories', checkAuthenticated, categoriesPost);

router.delete('/members/categories/:id', checkAuthenticated, categoriesDelete);

router.get('/members/comments', checkAuthenticated, membersCommentsPage);

router.delete('/members/comments/:id', checkAuthenticated, deleteComment);

router.get('/members/users', checkAuthenticated, membersUsersPage);

router.delete('/members/posts/:id', deleteBicycle);

router.get('/members/posts/add', membersAddItemPage);

// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  // Choose a destination
    destination: function (req, file, cb) {
  // Lets store them in the uploads folder
      cb(null, "./public/images/")
    },
  // Choose a filename for each uploaded image
    filename: function (req, file, cb) {
  // Lets create a unique name for each image
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + path.extname(file.originalname))
    }
  })


const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
  // dest: 'images',
})

router.post('/members/posts/add', upload.array('image', 12),membersAddItem);

router.put('/members/posts/:id/delete/:img', checkAuthenticated,deleteImage);

router.get('/members/posts/:id/image', getImage);

router.get('/members/posts/:id', editBicycleWeb);




router.patch('/members/posts/:id', checkAuthenticated, editBicycle);

router.delete('/logout', logoutAction);



router.get('/register', registerPage);


module.exports = router;
