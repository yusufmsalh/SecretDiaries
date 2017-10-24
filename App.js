      const express = require('express');
      const path = require ('path');
      //console.log("Hello World 1");
      const mongoose= require('mongoose');
      const bodyParser = require('body-parser');
      const expressValidator = require('express-validator');
      const flash = require('connect-flash');
      const session = require('express-session');
      const config = require('./config/database');
      const passport = require('passport');
      //mongoose.connect('mongodb://localhost/nodekb');
      mongoose.connect(config.database, {
      useMongoClient: true,
      /*  solution of DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, */
      });

      let db = mongoose.connection;

      const app = express();
      app.set('views',path.join(__dirname,'views'));
      app.set('view engine','pug');//setting view Engine

      // parse application/x-www-form-urlencoded
      app.use(bodyParser.urlencoded({ extended: false }))

      // parse application/json
      app.use(bodyParser.json())


      app.use(express.static(path.join(__dirname,'public')));



//Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,//Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: true,
//  cookie: { secure: true }
}));

//Express Message Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

      //DB Part


      db.once('open',function()
      {

      console.log('connected to Mongodbs By Yusuf 002');
      });

      db.on('error',function(err){
      console.log(err);

      });
      // Passport init
      require('./config/passport')(passport);
    app.use(passport.initialize());
    app.use(passport.session());
    //Chek if User is Logged in
    app.get('*',function(req,res,next){

      res.locals.user=req.user || null;
      next();
    });


  let Art = require('./Models/articles');
//Route Files


//Home Route
      app.get('/',function (req,res){
      //console.log("Hello World 3");
      Art.find({},function(err,articles)
      {
      console.log("Hello World 3");
      if(err)
      {
      console.log(err);
      }

      else
      {
      //  console.log("Hello World 5");
      res.render('index',{
      title:'Articles',
      articles:articles
      });
      }
      });
      });



      // Route Files
      let articles = require('./Routes/articles');
      let users = require('./Routes/users');
      app.use('/articles', articles);
      app.use('/users', users);



      app.listen(3010,function(){

      console.log('Server Started on Port 3010...');
      });
