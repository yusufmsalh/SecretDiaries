//DB File
const mongoose= require('mongoose');
console.log('Home 3 inside model ');
let Userschema= mongoose.Schema(
{

name:
{
  type : String,
  required : true
},
email :
{
  type : String,
  required : true
},
  username:
  {
    type : String,
    required : true
  },
  password :
  {
    type : String,
    required : true
  }
});
console.log('Home 3 outside model ');
let User =module.exports=mongoose.model('User',Userschema);
console.log('Home 3 outside model 2 ');
