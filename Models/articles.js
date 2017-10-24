const mongoose= require('mongoose');

//Building the schema
let Aschema= mongoose.Schema(
{

title:
{
  type : String,
  required : true
},
author :
{
  type : String,
  required : true
},
  body:
  {
    type : String,
    required : true
  }
});

let Articles =module.exports=mongoose.model('articles',Aschema);
