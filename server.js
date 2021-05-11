const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.send('Hello, mundo!');
});

app.get('/x', function (req, res) {
  res.send('Hello, mr. X!:'+process.env.apiKey);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});

