const express = require('express');
const fileUpload = require('express-fileupload');;
const app = express();

app.use(express.static(__dirname + '/src'));

app.use('/form', express.static(__dirname + '/index.html'));
app.use('/files', express.static(__dirname + '/uploads'));

// default options
app.use(fileUpload());

app.post('/ping', function(req, res) {
  res.send('pong');
});

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname + '/uploads/' + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded to ' + uploadPath);
  });
});

app.listen(8000, function() {
  console.log('Express server listening on port 8000'); // eslint-disable-line
});



// ======================

var fs = require('fs');

// app.use('/list', fs.readdir(__dirname + '/uploads'));

// fs.readdir("/list/", function(err, files) {
//   if (err) {
//      return console.error(err);
//   }
//   files.forEach( file => {
//      console.log( file );
//   });
// });

app.get('/list', function(req, res) {

  fs.readdir(__dirname + "/uploads/", function(err, files) {
    if (err) {
      res.send(err);
    } else {
      res.send(files);
    }
  });
});

