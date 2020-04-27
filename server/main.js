const http = require('http');
const mongoose = require('mongoose');
const shell = require('./src/shell');
const launch = require('./src/launch')
const delayer = require('./src/delayer');

const app = require('./app');
const database = require('./src/databaseManagement')

////////////////////////////////////////////////////////////////////////////////
// Mongoose                                                                    //
////////////////////////////////////////////////////////////////////////////////


mongoose.connect('mongodb+srv://NoobyBoy:testtest@data-6apbx.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true })
  .then(() => console.log('Connection to MongoDB Done !'))
  .catch(() => console.log('Connection to MongoDB failed !'));

  launch.LaunchServer()
  .then( _ => {

    ////////////////////////////////////////////////////////////////////////////////
    // Server                                                                    //
    ////////////////////////////////////////////////////////////////////////////////

    const errorHandler = error => {
      if (error.syscall !== 'listen') {
        throw error;
      }
      const address = server.address();
      const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges.');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use.');
          process.exit(1);
          break;
        default:
          throw error;
      }
    };

    const server = http.createServer(app);

    server.on('error', errorHandler);
    server.on('listening', () => {
      const address = server.address();
      const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + '8080';
    });

    console.log('Listening on 8080');
    server.listen(8080);

    shell.shell();
    delayer.LaunchWaiter();
});
