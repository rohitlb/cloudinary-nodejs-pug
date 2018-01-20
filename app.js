var express    = require('express');
var cloudinary = require('cloudinary');
var bodyParser = require('body-parser')();
var fileParser = require('connect-multiparty')();
var port = Number(process.env.PORT || 4000);

cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key:    'your_api_key',
    api_secret: 'your_api_secret'
});

var app = express();

app.set('view engine', 'pug');

app.use( bodyParser );

app.get('/', function(req, res){
  res.render('index');
});

app.post('/upload', fileParser, function(req, res){

  var imageFile = req.files.image;

  cloudinary.uploader.upload(imageFile.path, function(result){
    if (result.url) {

      //url should be stored in the database .. it is the path for profile pic of user
      console.log(result.url);
      //res.render('upload', {url: result.url});

    } else {
      //if error
      console.log('Error uploading to cloudinary: ',result);
      res.send('did not get url');
    }
  });
});

console.log('App started on port',port);
app.listen(port);