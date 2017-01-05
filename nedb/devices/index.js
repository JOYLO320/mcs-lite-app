var Datastore = require('nedb');
var devices = new Datastore({ filename: './db/devices.json', autoload: true});
var Validator = require('jsonschema').Validator;
var v = new Validator();
var schema = require('./schema');

module.exports = {
  validateSchema: function(object) {
    return v.validate(object, schema);
  },

  retriveUserDevices: function(query, sort, skip, limit) {

    query.isActive = true;

    return new Promise(function(resolve, reject) {
      if (sort && skip && limit) {
        return
          devices
          .find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .exec(function(err, data) {
            if (err) return reject();
            return resolve(data);
          });
      } else {
        return devices.find(query, function(err, data) {
          if (err) return reject();
          resolve(data);
        });
      }
    });
  },

  retriveAllDevices: function(query, sort, skip, limit) {
    return new Promise(function(resolve, reject) {
      if (sort && skip && limit) {
        return
          devices
          .find({})
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .exec(function(err, data) {
            if (err) return reject();
            return resolve(data);
          });
      } else {
        return devices.find({}, function(err, data) {
          if (err) return reject();
          resolve(data);
        });
      }
    });
  },

  addNewDevice: function(field) {
    field.deviceId = '123123';
    field.deviceKey = '123123';
    field.isPublic = false;
    field.isActive = false;
    field.isHeartbeating = false;
    field.createdAt = new Date().getTime();
    field.updatedAt = new Date().getTime();
    field.fwId = '';
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
      return new Promise(function(resolve, reject) {
        return devices.insert(field, function(err, data) {
          if (err) return reject();
          resolve(data);
        });
      });
    });
  },

  editDevices: function(query, update) {
    return new Promise(function(resolve, reject) {
      return devices.update(query, { $set: update }, {}, function(err, num) {
        console.log(num);
        if (err) return reject();
        resolve({ message: 'success' });
      });
    });
  },

  deleteDevices: function(updateContent, filter) {

  },
}