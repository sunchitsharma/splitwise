var express = require('express');
var splitcontroller = require('./controller/splitcontroller');

var app = express();

app.set('view engine','ejs');
app.use(express.static("uploads"));
  
splitcontroller(app);

app.listen(10000, function()
{
  console.log("The server is running at 10000");
});
