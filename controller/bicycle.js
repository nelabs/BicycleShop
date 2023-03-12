const Bicycle = require('../model/Bicycle');

exports.storeBicycle = async (req,res) => {
  try {
    console.log(req.body);
    const bicycle = new Bicycle(req.body);
    console.log(bicycle);
    await bicycle.save();
    return res.status(201).json({ success: true, bicycle});
  }
  catch(e) {
    console.log(colors.red.underline(e.message));
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

exports.fetchOneBicycleWEB = async (req,res) => {
  try {
    const bicycle = await Bicycle.findById(req.params.id);
    return res.render('overview', { bicycle })
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
  return res.status(201).json({success: true, bicycle});
  }
  catch (e) {
    return res.status(400).json({ success: false, message: e.message})
  }
}