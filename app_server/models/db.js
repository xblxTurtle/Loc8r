let mongoose = require('mongoose');

let dbURI = 'mongodb://localhost/Loc8r'; 

if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGODB_URI;
} 

mongoose.connect(dbURI);
mongoose.connection.on('connected',  function() {console.log('mongoose connected to '+dbURI);});
mongoose.connection.on('error',  function(error) {console.log('mongoose error :'+error);});
mongoose.connection.on('disconnected',  function() {console.log('mongoose disconnected from '+dbURI);});

let shutdownMongooseConnections = function (msg, callback) {
    mongoose.connection.close(function() {
        console.log('Closing Mongoose DB connection to '+dbURI + 'due to '+msg); 
        callback();
    })
}
process.on('SIGINT', function () {
    shutdownMongooseConnections( 'SIGINT', function() {process.exit(0)})
})
process.on('SIGTERM', function() { 
    shutdownMongooseConnections( 'SIGTERM', function() {process.exit(0)})
})

require('./locations');