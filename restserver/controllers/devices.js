
module.exports = function ($db) {
  var devices = $db.devices;
  console.log(devices);
  var retrieveDevice = function (req, res, next) {
    // console.log($db.devices.);
    console.log(123132);
    return new Promise(function(resolve, reject) {
      return devices.retriveUserDevices({ createUserId: req.user.userId })
    })
    .then(function(data) {
      return res.send('123123')
    })
    .catch(function(err) {
      console.log(err);
    });
  };

  var retrieveDeviceDetail = function(req, res, next) {
    var userId = req.user.userId;
  };

  var addNewDevice = function(req, res, next) {
    var userId = req.user.userId;
  };

  var editNewDevice = function(req, res, next) {
    var userId = req.user.userId;
  };

  return {
    retrieveDevice: retrieveDevice,
    retrieveDeviceDetail: retrieveDeviceDetail,
    addNewDevice: addNewDevice,
    editNewDevice: editNewDevice,
  };

};