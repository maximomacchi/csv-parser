var express = require('express');
var router = express.Router();
var fs = require('fs');

const UPLOADS_DIRECTORY = './uploads/';

router.get('/', function (req, res, next) {
  res.send('Hello world');
});

// Fetch all file names and return as JSON
router.get('/files/all', function (req, res, next) {
  fs.readdir(UPLOADS_DIRECTORY, function (e, files) {
    if (e) {
      res.status(500).send(e);
    } else {
      res.json(files);
    }
  });
});

// Parse file and return results as JSON
router.get('/file/parse/:filename', function (req, res, next) {
  fs.readFile(
    UPLOADS_DIRECTORY + req.params.filename,
    'utf-8',
    function (e, data) {
      // Split file text into array of arrays where each subarray represents one
      // row in the CSV file
      var lines = data.split('\n');
      lines = lines.map(function (line) {
        return line.split(',');
      });

      var responses = {};
      var cols = [];
      lines[0].forEach(function (col) {
        cols.push(col);
        responses[col] = {};
      });

      // Loop through each row and count number of responses for each question
      // i starts at 1 since first line in CSV is header columns
      for (var i = 1; i < lines.length - 1; i++) {
        for (var j = 0; j < lines[i].length; j++) {
          responses[cols[j]][lines[i][j]]
            ? responses[cols[j]][lines[i][j]]++
            : (responses[cols[j]][lines[i][j]] = 1);
        }
      }
      res.json(responses);
    }
  );
});

// Upload a new file to be stored in the server's local filesystem
router.post('/file/upload', function (req, res, next) {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded',
      });
    } else {
      var csv = req.files.file;
      csv.mv(UPLOADS_DIRECTORY + csv.name);
      res.send({
        status: true,
        message: 'File has been uploaded',
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

// Delete file from server's local filesystem
router.delete('/file/delete/:filename', function (req, res, next) {
  try {
    fs.rm(UPLOADS_DIRECTORY + req.params.filename, function (e) {
      if (e) {
        res.status(500).send(e);
      }
    });
    res.send({
      status: true,
      message: 'Successfully deleted ' + req.params.filename,
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
