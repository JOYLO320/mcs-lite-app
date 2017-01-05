var Datastore = require('nedb');
var users = new Datastore({ filename: './db/users.json', autoload: true });
var Validator = require('jsonschema').Validator;
var v = new Validator();
var schema = require('./schema');
var shortid = require('shortid');

module.exports = {
  validateSchema: function(object) {
    return v.validate(object, schema);
  },

  addNewUser: function(field) {
    field.userId = shortid.generate();
    field.isActive = false;
    field.createdAt = new Date().getTime();
    field.updatedAt = new Date().getTime();
    field.isActive = true;
    var validataSchema = v.validate(field, schema);

    return new Promise( function(resolve, reject) {
      /* validate schema */
      var validataSchema = v.validate(field, schema);

      if (validataSchema.errors.length === 0) {
        return resolve();
      } else {
        return reject({ schema: validataSchema.errors })
      }
    })
    .then(function() {
      /* find same email or not */
      return new Promise( function(resolve, reject) {
        return users.find({ email: field.email }, function(err, data) {
          if (err) {
            return reject(err);
          }
          if (data.length === 0) {
            return resolve();
          } else {
            return reject({ error: 'This email was registed!' });
          }
        });
      });
    })
    .then(function() {
      /* inser into database */
      return new Promise(function(resolve, reject) {
        return users.insert(field, function(err, data) {
          if (err) return reject();
          resolve(data);
        });
      });
    });
  },

  retrieveUserList: function() {
    return new Promise(function(resolve, reject) {
      return users.find({}, function(err, data) {
        if (err) return reject();
        resolve(data);
      });
    });
  },

  retrieveOneUser: function(query) {
    return new Promise(function(resolve, reject) {
      return users.find(query, function(err, data) {
        if (err) return reject();
        resolve(data);
      });
    });
  },

  editUser: function(query, update) {
    return new Promise(function(resolve, reject) {
      return users.update(query, { $set: update }, {}, function(err, num) {
        console.log(num);
        if (err) return reject();
        resolve({ message: 'success' });
      });
    });
  },
}