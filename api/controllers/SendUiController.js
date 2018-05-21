/**
 * SendUiController
 *
 * @description :: Server-side logic for managing senduis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var newman = require('newman');
module.exports = {

	view_data:function(req,res){
			var db = sails.db;
			db.collection('latest_data',function(err, coll){
							 if(err) throw err;
							 coll.find().toArray(function(err, items){
								 delete items[0]._id;
								 return res.json(items);
							 })
						 })

    },

    getapidata: function (req, res) {
        var db = sails.db;
        db.collection('apitrial', function (err, coll) {
            if (err) throw err;
            var i;
            coll.find().toArray(function (err, items) {
                delete items[0]._id;
                //console.log(items)
                //console.log(items[0].urldata)
                //console.log(items[0].urldata[0])
                
                
                return res.json(items[0].urldata);
            })

                

            }
            ) 
                
                //delete items[0]._id;
                //var services = [];
                //for (i in items[0]) {
                //    services.push(i);
                //}
                //return res.json(services);
            
       

    },

view_services:function(req,res){
			var db = sails.db;
			db.collection('latest_data',function(err, coll){
							 if(err) throw err;
							 coll.find().toArray(function(err, items){
								 delete items[0]._id;
								 var services = [];
								 for(i in items[0]){
									 services.push(i);
								 }
								 return res.json(services);
							 })
						 })

    },

  set_all_values:function (req,res){
    // newman.run({
    //   collection:collect,
    //   reporters: 'html',
    //   reporter:{html:{export:'./results.html'}}
    // }, function(err){
    //     if(err) throw err;
    //     console.log('completed');
    //   }
    // )
      console.log(req.body);
      var url = req.body.url;
      var method = req.body.type;
      console.log(method)
      var id = url + method;
      console.log(id);
      var template = require('./template.json');
      console.log(url);
      console.log(method);
   
        
        var db = sails.db;
  
        db.collection('apis', function (err, coll) {
            coll.find().toArray(function (err, items) {
                if (err) throw err;
                console.log(items[0]);
                var collect = items[0];
                console.log(template.tests);
                template.id = id;
                template.url = url;
                template.method = method;
                template.name = url;
                collect.folders[0].order.push(id);
                console.log(collect.folders[0].order);
                collect.requests.push(template);
                console.log(collect.requests);
                console.log(collect.requests)
                // newman.run({
                //   collection:collect,
                //   reporters: 'junit',
                //   reporter:{junit:{export:'./results.xml'}}
                // }, function(err){
                //     if(err) throw err;
                //     console.log('completed');
                //   }
                // )
                // coll.remove({}, function(err, items){
                //   coll.insert(collect, function(err, itm){
                //     if(err) throw err;
                //   })
                // })
                coll.update({ "id": "checkingstatusofallapis" }, collect, function (err, item) {
                    if (err) throw err;
                    //newman.run({
                    //    collection: collect,
                    //    reporters: 'junit',
                    //    reporter: { junit: { export: './results.xml' } }
                    //}, function (err) {
                    //    if (err) throw err;
                    //    var result = require('./results.xml');
                    //    db.collection('result').insert({ result }, function (err, res) {
                    //        if (err) throw err;
                    //        console.log('completed');
                    //    })
                    //})
                })
            })
        })
        

   
},

  postapi: function (req, res) {

      console.log(req.body);
      var url = req.body.url;
      var method = req.body.method;
      var id = url + method;
      console.log(id);
      var template = require('./template.json');
      console.log(url);
      console.log(method);
      //console.log(template);
      var values_set = set_all_values(id, url, method, template);

  },


  get_all: function (req, res) {
      var myObj = {};
      myObj["username"] = req.body.username;
      myObj["password"] = req.body.password;
      myObj["host"] = req.body.host;
      myObj["database"] = req.body.database;
      myObj["port"] = req.body.port;
      myObj["adapter"] = req.body.adapter;
      myObj["service"] = req.body.service;
      var id = req.body._id;
      console.log(id)
      sails.log(myObj);

      sails.log('inside mongo');
      try {
          Mongo.connect(Mongo_url, {
              sslValidate: false,
          }, function (err, db) {
              if (err) throw err;
              db = db.db();
              db.collection('sample', function (err, coll) {
                  sails.log('inside db');
                  if (err) throw err;
                  var o_id = new mongo.ObjectID(id);

                  if (!id) {
                      coll.insert(myObj, function (err, items) {
                          sails.log('inside coll');
                          if (err) throw err;
                          return res.json(items);
                      })
                  }
                  else {
                      coll.update({ "_id": o_id }, myObj, function (err, items) {
                         if (err) throw err;
                      })
                  }
                  

              })
          })

      }
      catch (e) {
          console.log('oops!');
          return res.ok();
      }
  },

view_service_data:function(req, res){
			var db = sails.db;
			db.collection('latest_data',function(err, coll){
                if (err) throw err;

							 coll.find().toArray(function(err, items){
								 delete items[0]._id;
								 return res.json(items[0][req.params.service]);
							 })
						 })
			//console.log(req.params.service);

        },
getconnections: function (req, res) {
    var db = sails.db;
    
    db.collection('sample', function (err, coll) {
        
        if (err) throw err;
        coll.find().toArray(function (err, items) {
          //delete items[0]._id;
            return res.json(items) 
        })
    })
    }

};
