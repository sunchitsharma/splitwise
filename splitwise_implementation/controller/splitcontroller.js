




//DATABASE/////////////////////////////////////////////////////////////////////////////////////////////////////////
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});


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

const TransactionSchema = new Schema({
  user1:String,
  user2:String,
  money:String
});

const RegisterUser = mongoose.model('registerusercollection',RegisterUserSchema);

const Transaction = mongoose.model('transactioncollection',TransactionSchema);

//RENDERING/////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function (app) {
// For rendering the login page
app.get('/login',function(req,res){
  res.render('login');
});
// For rendering the regiter page

app.get('/register',function(req,res){
  res.render('register');
});

app.get('/dashboard',function(req,res){
  res.render('dashboard');
});


app.post('/register_db',urlencodedParser ,function(req,res){


    console.log(req.body);

   const user = new RegisterUser({
     username:req.body.user,
     password:req.body.pass,
     email:req.body.email_id
   });

   user.save().then(function(){
     console.log("Inserted in the DB from regiter page");
   })

});

app.post('/money_db',urlencodedParser ,function(req,res){


    console.log(req.body);

   const user = new Transaction({
     user1:req.body.usr1,
     user2:req.body.usr2,
     money:req.body.mny
   });

   user.save().then(function(){
     console.log("Inserted in the Transaction DB from split button");
   })

});


//checking for user credentials///////////////////////////////////////////////////////////////////////////////////////

app.post('/check_for_user',urlencodedParser,function(req,res){
  console.log("check_for_user");
  console.log(req.body.username);

  RegisterUser.find({username:req.body.username,password:req.body.password}).then(function(result){
    res.json(result);
    console.log("Check for username and password during login");
    console.log(result);
  });
});

//fetching get data

app.post('/fetch_get',urlencodedParser,function(req,res){
  console.log("fetch_get");

    Transaction.find({user1:req.body.user1}).then(function(result){
    res.json(result);
    console.log("Get Data Sent to user");
    console.log(result);
  });
});

app.post('/fetch_give',urlencodedParser,function(req,res){
  console.log("fetch_give");

    Transaction.find({user2:req.body.user2}).then(function(result){
    res.json(result);
    console.log("Get Data Sent to user");
    console.log(result);
  });
});

//settlement//////////////////////////////////////
app.post('/settled',urlencodedParser,function(req,res){
  console.log("Settled Account");

    Transaction.remove({user1:req.body.usr1, user2:req.body.usr2, money:req.body.mny}).then(function(result){
    res.json(result);
    console.log("Removed Successfully");
    console.log(result);
  });
});

};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
