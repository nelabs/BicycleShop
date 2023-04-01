const User = require('../model/User');
const bcrypt = require('bcryptjs');
const Bicycle = require('../model/Bicycle');
const Category = require('../model/Category');
const Comment = require('../model/Comment');
const mongoose = require('mongoose');



exports.storeUser = async (req,res) => {
  try {
    // req.body.password = await bcrypt.hash(req.body.password, 8);
    const user = new User(req.body);

    await user.save();
    return res.status(201).json({ success: true, user});

  }
  catch (e) {
    // return res.status(400).json({ success : false, message: e.message })
    return res.render('register', { success : false, message: e.message });
  }
}

exports.login = async (req, res) => {
  const {email, password} = req.body;
  console.log(email);



  const user = await User.findOne({email});

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid Email/password',
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid Email/password',
    });
  }
    return res.status(200).json({
      success: true,
      user,
    });

}


exports.loginPage = async (req, res) => {
  return res.render('login', { page_name: 'Login', message: ''});
}

exports.membersPage = async (req, res) => {
  console.log(req.body);
  return res.render('members', { page_name: 'Members', message: '', name: 'john' }); // need update name
}

exports.membersCategoriesPage = async (req, res) => {
    const categories = await Category.find({});
    // const flashMsg = req.flash('success');
    // const flashMsg = null;
    return res.render('membersCategories', { categories });
  
}

exports.membersUsersPage = async (req,res) => {
  const users = await User.find({});
  return res.render('membersUsers', { users });
}

exports.categoriesPost = async (req,res,done) => {
  // console.log(req.body);
  const {category, description} = req.body;
  if (!category || !description) {
    req.flash('error', 'Category name and description required');
    const categories = await Category.find({});
    return res.render('membersCategories', { categories })
 
  }
  try {
   
    const category = new Category(req.body);
    await category.save();
    const categories = await Category.find({});

    req.flash('success', 'Category has been added successfully');
    // console.log(req.body);
    return res.render('membersCategories', { categories })

    // return res.status(201).json({success:true})

  }
  catch (e) {
    return res.render('membersCategories', { success : false, message: e.message });

  }
}

exports.categoriesDelete = async (req,res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    req.flash('success', 'Category deleted successfully');
    return res.redirect('/members/categories');
  }
  catch (e) {
    return res.status(400).json({ success: false, message: e.message})
  }
}

exports.membersCommentsPage = async (req, res) => {
  const bicycles = await Bicycle.find({});
  const comments = await Comment.find({});

  // const flashMsg = req.flash('success');
  // const flashMsg = null;
  // console.log(comments);
  return res.render('membersComments', { bicycles, comments });

}

exports.membersPostsPage = async (req, res) => {
  try {
    const bicycles = await Bicycle.find({});
    return res.render('membersPosts', { bicycles, message: '' })
  }
  catch (e) {
    return res.render('membersPosts', {
      bicycles      
    });
  }
}
exports.membersAddItemPage = async (req, res) => {
  const categories = await Category.find({});

  return res.render('membersAddItem', { categories });

}

exports.membersAddItem = async (req, res) => {
  const {name, description} = req.body;
  console.log(req.body);
  if (!name || !description) {
    req.flash('error', 'Item name and description required');
    const categories = await Category.find({});
    return res.render('membersAddItem', { categories })
 
  }
  try {
   
    // const bicycle = new Bicycle(req.body);
    const bicycle = new Bicycle( 
      {
        _id: new mongoose.Types.ObjectId(),
        category: {
          category: req.body.category,
        },
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        discount_percentage: req.body.discount_percentage
      },
      {
      new: true,
      runValidators: true
    });
    

    await bicycle.save();
    const categories = await Category.find({});

    req.flash('success', 'Item has been added successfully');
    // console.log(req.body);
    return res.render('membersAddItem', { categories })

    // return res.status(201).json({success:true})

  }
  catch (e) {
    // return res.render('membersAddItem', { categories, success : false, message: e.message });
    return res.status(400).json({ success: false, message: e.message})

  }

}

exports.registerPage = async (req,res) => {
  return res.render('register', { page_name: 'Register', message: ''});
}

exports.logoutAction = async (req,res) => {
  req.logOut((err) => {
    if (err) { 
      return next(err); 
    }
  });
  res.redirect('/login');
}