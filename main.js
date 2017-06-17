let fetch = require('node-fetch')

fetch('https://api.github.com/users/github')
    .then(function(res) {
      return res.json()
    }).then(function(json) {
      console.log(json)
    }
)

let express = require('express');
let app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/airport', function (req, res) {
  res.send('Hello World!');
});

app.get('/puzzles', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
