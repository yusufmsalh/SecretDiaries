//Routes File
const express = require('express');
const router = express.Router();
//bring in the Article Model
let Art = require('../Models/articles');

//bring in the User Model
let User = require('../Models/user');

//Add Article -Get
      router.get('/add',function (req,res){
      console.log("Hello World 3.5");
      res.render('add',{
      title:'Add Article'

      });
      });



//Add Article -Post
router.post('/add',function (req,res){
console.log("Hello World 4");
//Adding Validation Rules
//filed name ,msg.rule
req.checkBody('title','Title is Requried').notEmpty();
//req.checkBody('author','Author is Requried').notEmpty();
req.checkBody('body','body is Requried').notEmpty();

//get Errors
  console.log("Hello World 3.8");
let errors = req.validationErrors();
if(errors)
{
  console.log("Hello World 4.1");
console.log(errors);
res.render('add',{
title:'Add Article',
errors:errors
});
}
else {
  console.log("I am inside Errors");
let a = new Art();
a.title=req.body.title;
a.author= req.user._id;
a.body = req.body.body;
a.save(function(err){
if(err){
console.log(err + '##############');
return;
}
else {

console.log("Hello World 6");
req.flash('success','Article has been Added Successfully');
//bootstrap alert colour,Msg to display
//  console.log("Sucess of Message");
res.redirect('/');
}
});


}

});



      console.log("Hello World 8.5");




      //Edit-load Single Article
      router.get('/edit/:id',ensureAuthenticated,function (req,res){
      console.log("Hello World 19");
      Art.findById(req.params.id,function(err,article){
        console.log("Inside Art.findById(req.params.id,function(err,article){");
     if(article.author != req.user._id){
     req.flash('danger', 'Not Authorized');
     res.redirect('/');
      }
      console.log("Hello World 100");
      res.render('edit_article',{//template to be drawn
      article:article,
      title:"Editing Your Article"
      });
      });
      });
      console.log("Hello World 11");




      //Update Submit  POST Route
      router.post('/edit/:id',function (req,res){
      console.log("Hello World 13");
      let a = {};
      a.title=req.body.title;
      a.author= req.body.author;
      a.body = req.body.body;
      let query = {_id:req.params.id};
      Art.update(query,a,function(err){//model = update (query,emptyobject filled by form,--
      if(err){console.log(err + '##############');return;}
      else
      {
        console.log("I am inside update");
        req.flash('success','Article has been Updated Successfully');
        res.redirect('/');

    }

      });
      });


      //Delet Request
      /*
      router.delete('/:id',function(req,res)
      {
        if(!req.user._id){
    res.status(500).send();
  }
      let query = {_id:req.params.id}
      if(article.author != req.user._id){
    res.status(500).send();
  } else
  {
      Art.remove(query,function(err){
      if(err)
      {console.log(err);}

      res.send('Success');

      });
    }
      });
*/


      //Get Single Article
      router.get('/:id',function (req,res){
      console.log("Hello World 7");
      Art.findById(req.params.id,function(err,article){
      User.findById(article.author,function(err,user){
      console.log("Hello World 8");
      res.render('article',{
      article:article,
      author:user.name
      });
    });
      });
      });

      module.exports=router;

      // Access Control
function ensureAuthenticated(req, res, next){
  console.log("Inside ensureAuthenticated ");
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}
