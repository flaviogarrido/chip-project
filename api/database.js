const Datastore = require('nedb')
const dbName = 'locker.db';

var db;

if (!db) {
    db = new Datastore({
        filename: dbName, 
        autoload: true 
    });
    console.log('Local database ' + dbName + ' ready')
}

module.exports = db;
