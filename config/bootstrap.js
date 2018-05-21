/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
    mongo = require('mongodb');
    Mongo = mongo.MongoClient;
  Mongo_url = 'mongodb://radiatordev_rw:lWqZm9iTfV2E4I3@10.64.5.92:7683,10.64.5.93:7683,10.64.5.94:7683/radiatordev?ssl=true&replicaSet=mongo7683';
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  Mongo.connect(Mongo_url, {
	  sslValidate:false,
  },function(err, db) {
    if(err) throw err;
    console.log('connected');
    sails.db = db.db();

  })

  cb();
};
