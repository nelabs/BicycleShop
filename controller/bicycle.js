const Bicycle = require('../model/Bicycle');
const Comment = require('../model/Comment');
const Category = require('../model/Category');

exports.storeBicycle = async (req,res) => {
  try {
    console.log(req.body);
    const bicycle = new Bicycle(req.body);
    console.log(bicycle);
    await bicycle.save();
    return res.status(201).json({ success: true, bicycle});
  }
  catch(e) {
    console.log(e.message);
    return res.status(400).json({ success : false, message: e.message })
  }
}

exports.editBicycleWeb = async (req,res) => {
  try {
    const bicycle = await Bicycle.findById(req.params.id);
    const categories = await Category.find({});
    // console.log(category);
    return res.render('membersEditItem', { bicycle, categories })
  }
  catch(e) {
    console.log(e.message);
    return res.status(400).json({ success : false, message: e.message })
  }
}
exports.editBicycle = async (req,res) => {
  try {
    const bicycle = await Bicycle.findByIdAndUpdate(req.params.id, 
      {
        $set: {
          "category.category": req.body.category,
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
    const categories = await Category.find({});
    
    return res.render('membersEditItem', { bicycle, categories })
  }
  catch(e) {
    console.log(e.message);
    return res.status(400).json({ success : false, message: e.message })
  }
}

exports.fetchAllBicyclesAPI = async (req,res) => {
  try {
    const bicycles = await Bicycle.find({});
    return res.json({ success: true, bicycles })
  }
  catch (e) {
    return res.status(400).json({ success : false, message: e.message })
  }
}
exports.fetchAllBicyclesWEB = async (req,res) => {
  try {
    const bicycles = await Bicycle.find({});
    return res.render('bicycles', { bicycles })
  }
  catch (e) {
    return res.render('bicycles', {
      bicycles,
      page_name: "Home"
    });
  }
}
// calculate average rating from all reviews summarized on bicycleid property
async function getAverageRating(bicycleid) {
  const pipeline = [
    {
      $match: {
        bicycleid: bicycleid
      }
    },
    {
      $group: {
        _id: "$bicycleid",
        averageRating: { $avg: "$rating" }
      }
    }
  ];
  const result = await Comment.aggregate(pipeline)

  if (result.length === 0) {
    return null;
  }

  var avgRating = result;
  return avgRating;
 
}

exports.fetchOneBicycleWEB = async (req,res) => {
  try {
     const avgrating = await getAverageRating(req.params.id);

    let avgratingtopass = null;
    if (avgrating && avgrating.length > 0) {
      avgratingtopass = avgrating[0].averageRating.toFixed(0);
    }
    // console.log(avgratingtopass); pass to overview page :)

    const bicycle = await Bicycle.findById(req.params.id);
    const comments = await Comment.find({bicycleid: req.params.id});
    return res.render('overview', { bicycle, comments, avgratingtopass })
  }
  catch (e) {
    return res.status(404).json({ 
      success: false, 
      message: e.message,
    });
  }
}

exports.updateBicycle = async (req,res) => {
  try {
    const bicycle = await Bicycle.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
      runValidators: true,
    });
   
  if (!bicycle) {
    return res.status(404).json({ 
      success: false, 
      message: 'Bicycle by such id not found',
    });
  }

  return res.status(201).json({success: true, bicycle});
  }
  catch (e) {
    return res.status(400).json({ success: false, message: e.message});
  }

}


exports.deleteBicycle = async (req,res) => {
  try {
    const bicycle = await Bicycle.findByIdAndDelete(req.params.id);
    req.flash('success', 'Item deleted successfully');
    return res.redirect('/members/posts');
  }
  catch (e) {
    return res.status(400).json({ success: false, message: e.message})
  }
}