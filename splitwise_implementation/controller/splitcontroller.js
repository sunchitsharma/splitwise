




//DATABASE/////////////////////////////////////////////////////////////////////////////////////////////////////////
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydb',{useMongoClient: true});

mongoose.connection.once('open',function(){
  console.log("Connected to Mongo DB");
}).on('error',function(){
  console.log("Error in DB connection");
});


//Object for mongoose schema
const Schema = mongoose.Schema;

//#### SCHEMA FOR REGISTER ####//

const RegisterUserSchema = new Schema({
  username:String,
  password:String,
  email:String
});

const RegisterUser = mongoose.model('registerusercollection',RegisterUserSchema);

//RENDERING/////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function (app) {
// For rendering the login page
app.get('/login',function(req,res){
  res.render('login');
});
// For rendering the regiter page
app.get('/register',function(req,res){


   const user = new RegisterUser({
     username:"satish",
     password:"iamcool",
     email:"satish@gmail.com"
   });

   user.save().then(function(){
     console.log("Inserted in the DB from regiter page");
   })


  res.render('register');
});

};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
