let fetch = require('node-fetch')

let port = process.env.PORT || 3000;

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

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
