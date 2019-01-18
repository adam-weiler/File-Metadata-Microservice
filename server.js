'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});


// app.post('/api/fileanalyse', function(req, res){ 
//   let up_file = req.body.upfile;
//   res.json({greetings: up_file});
// });


app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  let up_file = req.file;
  res.json({name: up_file.originalname, type: up_file.mimetype , size: up_file.size});
})

app.get('/api/fileanalyse', function(req, res){
  res.json("Not found");
});





app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
