// const express = require('express');
// const app = express();
// const packageInfo = require('./package.json');

// // server.all('/', (req, res) => {
// //   res.send('Bot is running!');
// // });

// function keepAlive() {
//   app.get('/', function (req, res) {
//     res.json({ version: packageInfo.version });
//   });

//   const server = app.listen(process.env.PORT || 3000 , function () {
//     const host = server.address().address;
//     const port = server.address().port;

//     console.log('Web server started at http://%s:%s', host, port);
//   });
// }
// module.exports = keepAlive;
var express = require('express');
var packageInfo = require('./package.json');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web server started at http://%s:%s', host, port);
});

module.exports = function (bot) {
  app.post('/' + bot.token, function (req, res) {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });
};