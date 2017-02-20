
module.exports = function ($db) {
  var devices = $db.devices;
  var users = $db.users;
  var prototypes = $db.prototypes;

  var retrieveDevice = function (req, res, next) {
    var userId = req.user.userId;

    return devices.retriveUserDevices({
      createUserId: userId,
      isActive: true,
    })
    .then(function(data) {
      return res.send(200, { data: data });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var retrieveDeviceDetail = function(req, res, next) {
    var userId = req.user.userId;
    var deviceData = {};
    return devices.retriveUserDevices({
      createUserId: userId,
      deviceId: req.params.deviceId,
      isActive: true,
    })
    .then(function(data) {
      deviceData = data[0];
      return users.retrieveOneUser({
        userId: deviceData.createUserId,
        isActive: true,
      });
    })
    .then(function(data) {
      deviceData.user = {
        userName: data[0].userName,
        userId: data[0].userId,
      };
      return prototypes.retriveUserPrototypes({
        prototypeId: deviceData.prototypeId,
      });
    })
    .then(function(data) {
      deviceData.prototype = {
        prototypeId: data[0].prototypeId,
        version: data[0].version,
        prototypeName: data[0].prototypeName,
      };
      return res.send(200, { data: deviceData });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var addNewDevice = function(req, res, next) {
    var userId = req.user.userId;

    return devices.addNewDevice({
      createUserId: userId,
      deviceName: req.body.deviceName,
      deviceDescription: req.body.deviceDescription,
      deviceImageURL: req.body.deviceImageURL,
      prototypeId: req.body.prototypeId,
    })
    .then(function(data) {
      return res.send(200, { data: data })
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var editDevice = function(req, res, next) {
    var userId = req.user.userId;

    return devices.editDevices({
      deviceId: req.params.deviceId,
      createUserId: userId,
      isActive: true,
    }, {
      deviceName: req.body.deviceName,
      deviceDescription: req.body.deviceDescription,
      deviceImageURL: req.body.deviceImageURL,
    })
    .then(function() {
      return res.send(200, { message: 'success' });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var setPublicDevice = function(req, res, next) {
    var userId = req.user.userId;
    var isPublic = req.body.isPublic;

    return devices.editDevices({
      deviceId: req.params.deviceId,
      isActive: true,
      createUserId: userId,
    }, {
      isPublic: isPublic,
    })
    .then(function() {
      return res.send(200, { message: 'success' });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var deleteDevice = function(req, res, next) {
    var userId = req.user.userId;
    return devices.deleteDevice({
      deviceId: req.params.deviceId,
      isActive: true,
      createUserId: userId,
    })
    .then(function() {
      return res.send(200, { message: 'success'});
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  return {
    retrieveDevice: retrieveDevice,
    retrieveDeviceDetail: retrieveDeviceDetail,
    addNewDevice: addNewDevice,
    editDevice: editDevice,
    setPublicDevice: setPublicDevice,
    deleteDevice: deleteDevice,
  };
};