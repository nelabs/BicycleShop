const User = require('../model/User');
const bcrypt = require('bcryptjs');



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
  return res.render('login', { page_name: 'Login'});
}

exports.registerPage = async (req,res) => {
  return res.render('register', { page_name: 'Register', message: ''});
}