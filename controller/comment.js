const Comment = require('../model/Comment');

exports.postComment = async (req,res) => {
  
  try {
    const comment = new Comment(req.body);
    // console.log(req.body);
    await comment.save();
    const bicycle = req.body.bicycleid;
    // return res.render('overview', { bicycle });
    res.redirect('/bicycle/' + bicycle);
  } 
  catch (e) {
    return res.status(201).json({ success: false, message: e.message});
  }
  
}