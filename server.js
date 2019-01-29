const express = require('express');
const fileUpload = require('express-fileupload');;
const app = express();

app.use(express.static(__dirname + '/src'));

app.use('/form', express.static(__dirname + '/index.html'));
app.use('/progress.js', express.static(__dirname + '/src/progress.js'));
app.use('/HttpRequest.js', express.static(__dirname + '/src/HttpRequest.js'));
app.use('/files', express.static(__dirname + '/uploads'));
app.use('/style.css', express.static(__dirname + '/src/css/style.css'));
app.use('/reset.css', express.static(__dirname + '/src/css/reset.css'));

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