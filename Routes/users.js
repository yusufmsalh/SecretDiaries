//Route Folder
const express = require('express');
const router = express.Router();
//var validator = require("email-validator");
const bcrypt = require('bcryptjs');
const passport = require('passport');
//validator.validate("test@email.com")

//bring in the User Model
let User = require('../Models/user');
console.log('Home 2');


//Register Form
router.get('/register',function(req,res){
console.log("Hello World U 3.5");
res.render('register');
//res.send("Hello World");
});
//register Proccess
router.post('/register',function (req,res){
console.log("Hello World U 4");

const name=req.body.name;
const email= req.body.email;
const username = req.body.username;
const password=req.body.password;
const password2=req.body.password2;

req.checkBody('name','Name is required').notEmpty();
req.checkBody('email','Email is Requried').notEmpty();
req.checkBody('username','Username is Requried').notEmpty();
req.checkBody('password','Password is Requried').notEmpty();
req.checkBody('password2','Passwords Does not match').equals(req.body.password);
//var t =validator.validate(req.body.email);
//console.log("Email = " + t );
let errors = req.validationErrors();
// && validator.validate(req.body.email);)
if(errors){
   res.render('register', {
     errors:errors
   });
 } else {
   let newUser = new User({
     name:name,
     email:email,
     username:username,
     password:password
   });

   bcrypt.genSalt(10, function(err, salt){
     bcrypt.hash(newUser.password, salt, function(err, hash){
       if(err){
         console.log(err);
       }
       newUser.password = hash;
       newUser.save(function(err){
         if(err){
           console.log(err);
           return;
         } else {
           req.flash('success','You are now registered and can log in');
           res.redirect('/users/login');
         }
       });
     });
   });
 }
});

// Login Form
router.get('/login', function(req, res){
 res.render('login');
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

  // logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
});
  module.exports = router;
