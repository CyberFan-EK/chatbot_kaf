const express = require('express');
const app = express();
const packageInfo = require('./package.json');

// server.all('/', (req, res) => {
//   res.send('Bot is running!');
// });

function keepAlive() {
  app.get('/', function (req, res) {
    res.json({ version: packageInfo.version });
  });

  const server = app.listen(process.env.PORT, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Web server started at http://%s:%s', host, port);
  });
}
module.exports = keepAlive;
