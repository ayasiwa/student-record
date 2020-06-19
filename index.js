const express = require('express');
const http = require('http');
const port = 3000;
const debug = require('debug')('test:server');
const bodyParser = require('body-parser');

const app = express();

app.set('port', port);
app.use(bodyParser.json({limit: '100mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));


const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


// ROUTES
app.use('/api/student', require('./route/userdetails.route'));
app.use('/api/admin', require('./route/admindetails.route'));


/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log(`Listening on ${bind}`);
  }

  module.exports = app;

  