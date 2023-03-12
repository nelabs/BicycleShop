const mongoose = require('mongoose');
const colors = require('colors');

// async function storeInformation() {
//   const user = new User({
//     name: 'Giant',
//     age: 500,
//     isMarried: false,
//     salary: 80000,
//     gender: 'Male',
//   });

//   await user.save();
//   console.log(user);
// } 

// storeInformation();


const express = require('express');
const app = express();
// const bicycles = require('./data/data.json');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://0.0.0.0:27017/test').then(() => console.log('Database is connected')).catch((err) => console.error(err));

const bicycleRoutes = require('./routes/bicycle');
const userRoutes = require('./routes/user');
app.use(bicycleRoutes);
app.use(userRoutes);


app.set('view engine', 'ejs');
app.use(express.static('public'));




// app.use(express.json());

async function fetchInformation() {

  const bicycles = await Bicycle.find({});
  // console.log(bicycles);
  return bicycles;
}

  

// app.get('/', async (req,res)=> {    
//     insertDb();
//     const bicycles = await fetchInformation();
//     console.log(bicycles);

//     return res.render('bicycles', {
//     bicycles
//   });
// });



// app.get('/bicycle', async (req,res)=> {
//   console.log(req.query.id);

//   const bicycle = await Bicycle.findOne({ id: req.query.id });

//   console.log(bicycle);

//   return res.render('overview', {
//     bicycle
//   });

// });

app.listen(3000, () => console.log(colors.green.underline('Server is running '+ Date())));



