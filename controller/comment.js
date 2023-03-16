const Comment = require('../model/Comment');

exports.postComment = async (req,res) => {
  
  try {
    const comment = new Comment(req.body);
    // console.log(req.body);
    await comment.save();
    return res.status(201).json({ success: true});
  } 
  catch (e) {
    return res.status(201).json({ success: false, message: e.message});
  }
  
}