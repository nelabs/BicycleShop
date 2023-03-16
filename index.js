const mongoose = require('mongoose');
const colors = require('colors');
const User = require('./model/User');

const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const initializePassport = require('./passport-config');

initializePassport(passport, 
  async email => await User.findOne({email}),
  async id => await User.findOne({id}),
);


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
const flash = require('express-flash');
const app = express();
// const bicycles = require('./data/data.json');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());


app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

mongoose.connect('mongodb://0.0.0.0:27017/test').then(() => console.log('Database is connected')).catch((err) => console.error(err));

const bicycleRoutes = require('./routes/bicycle');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');

app.use(bicycleRoutes);
app.use(userRoutes);
app.use(commentRoutes);


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



