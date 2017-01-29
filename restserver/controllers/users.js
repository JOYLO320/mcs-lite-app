var jwt = require('jsonwebtoken');
var request = require('superagent');

/* config */
var $oauth = require('../../configs/oauth');
var $rest = require('../../configs/rest');

/* fetch basic token */
var clientId;
var clientSecret;
Object.keys($oauth.clients).forEach(function(key) { clientId = key; clientSecret = $oauth.clients[key].secret });
var basicToken = new Buffer(clientId + ':' + clientSecret).toString('base64');

module.exports = function ($db) {
  var users = $db.users;

  var login = function(req, res, next) {
    return new Promise((resolve, reject) => {
      if (!req.body.email || !req.body.password) {
        return reject('Email or password is not define.');
      }
      return resolve();
    })
    .then(() => {
      var data = {
        email: req.body.email,
        grant_type: 'password',
        password: req.body.password
      };

      return new Promise((resolve, reject) => {
        request
        .post(oauthHost + '/oauth/token')
        .set('Cache-Control', 'no-cache')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(data)
        .set('Authorization', 'Basic ' + basicToken)
        .end(function(err, res) {
          return res.ok ?  resolve(res.body) : reject(err.response.body.message);
        });
      });
    }).then((data)=> {
      var payload = {
        token: data
      };
      try {
        var token = jwt.sign(payload, $oauth.JWT_SECRET);
      } catch (err) {
        return next(err);
      }

      res.cookie('token', token, { maxAge: $rest.session.maxAge });

      return new Promise((resolve, reject) => {
        request
        .get(oauthHost + '/oauth/users/info')
        .set('Cache-Control', 'no-cache')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${data.access_token}`)
        .end(function(err, data) {

          if (data.ok) {
            if (process.env.NODE_ENV === 'dev') {
              return res.redirect('http://localhost:8081/prototypes');
            }
            return res.redirect('/prototypes');
          } else {
            reject(err.response.body.message);
          }
        });
      });
    }).catch((err)=> {
      if (err === 'Your account is not activated yet!') {
        return res.redirect(`/user/${req.locale}/verify?email=${req.body.email}`);
      } else {
        return res.redirect(`/login?errorMsg=${encodeURI(err)}`);
      }
    });
  };

  var checkCookies = function(req, res, next) {
    var info = {};
    return new Promise((resolve, reject) => {
      /* 檢查cookie中的token是否合法 */
      jwt.verify(req.body.token, $oauth.JWT_SECRET, function(err, payload) {
        return err ? reject(err) : resolve(payload.token);
      });

    }).then((token) => {
      /* 帶去 Oauth 檢查 */
      var data = {
        refresh_token: token.refresh_token,
        grant_type: 'refresh_token'
      };

      return new Promise((resolve, reject) => {
        request
        .post(oauthHost + '/oauth/token')
        .set('Cache-Control', 'no-cache')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(data)
        .set('Authorization', 'Basic ' + basicToken)
        .end(function(err, res) {
          return res.ok ?  resolve(res.body) : reject(err.response.body.message);
        });
      });

    }).then((token) => {
      /* 去抓 user info */
      return new Promise((resolve, reject) => {
        request
        .get(oauthHost + '/oauth/users/info')
        .set('Cache-Control', 'no-cache')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token.access_token}`)
        .end(function(err, res) {
          if (res.ok) {
            info.access_token = token.access_token;
            info.expire_time  = token.expire_time;
            info.userId       = res.body.userId;

            var payload = {
              token: token
            };

            var _token = jwt.sign(payload, $oauth.JWT_SECRET);
            info.token  = _token;

            return resolve(info);
          } else {
            return reject({
              code: err.response.body.code,
              message: err.response.body.message,
              token: token,
            });
          }
        });
      });

    }).then((info) => {
      return res.send(200, {
        results: info
      });
    }).catch((err) => {
      return res.send(401, {
        error: err,
        message: 'token is invalid.',
      });
    });
  };

  var loginInterface = function(req, res, next) {
    if (req.cookies.token) {
      return new Promise((resolve, reject) => {
        /* 解碼 cookie 內的 token */
        jwt.verify(req.cookies.token, $oauth.JWT_SECRET, function(err, payload) {
          return err ? reject(err) : resolve(payload.token);
        });

      }).then((token) => {

        req.body.token = token;
        return new Promise((resolve, reject) => {
          /* 檢查 token 是否 active */
          request
          .get(oauthHost + '/oauth/users/info')
          .set('Cache-Control', 'no-cache')
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', `Bearer ${token.access_token}`)
          .end(function(err, res) {
            return res.ok ? resolve('active') : reject({
              code: err.response.body.code,
              message: err.response.body.message,
              token: token
            });
          });

        }).then((data) => {

          return data;

        }).catch((err) => {

          var data = {
            refresh_token: token.refresh_token,
            grant_type: 'refresh_token'
          };
          /* 若非 active 則拿 refreshtoken 重新洗新的 token  */
          return new Promise((resolve, reject) => {
            request
            .post(oauthHost + '/oauth/token')
            .set('Cache-Control', 'no-cache')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(data)
            .set('Authorization', `Basic ${basic_token}`)
            .end(function(err, res) {
              return res.ok ?  resolve(res.body) : reject(err.response.body.message);
            });
          });
        });
      }).then((data) => {

        if (data !== 'active') {
          /* 如果非 active，就會把這些製作好的 token 塞入 cookie 中 */
          var payload = {
            token: data
          };
          var token = jwt.sign(payload, $oauth.JWT_SECRET);
          res.cookie('token', token, { maxAge: $rest.session.maxAge });
        }

        if (process.env.NODE_ENV === 'dev') {
          return res.redirect('http://127.0.0.1:8081/prototypes');
        }
        return res.render('index.html');

      }).catch((err) => {
        /* 有任何錯誤就返回首頁 */
        res.clearCookie('token', { path: '/' });
        if (process.env.NODE_ENV === 'dev') {
          return res.redirect('http://127.0.0.1:8081/');
        }

        return res.render('index.html');
      });
    } else {
      /* 如果 cookie 沒有 token 就是以前未登入過狀態 */
      if (process.env.NODE_ENV === 'dev') {
        if (req.query.errorMsg) {
          return res.redirect('http://127.0.0.1:8081?errorMsg=' + req.query.errorMsg);
        }
        return res.redirect('http://127.0.0.1:8081/');
      }

      return res.render('index.html');
    }
  };

  var adminLoginInterface = function(req, res, next) {
    return res.send(200, '123123');
  };

  var registUser = function(req, res, next) {
    return users.addNewUser({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    })
    .then(function(data) {
      return res.send(200, { message: 'success' });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var retrieveUserList = function(req, res, next) {
    var userId = req.user.userId;
    return users.checkIsAdmin(userId)
    .then(function() {
      return users.retrieveUserList()
    })
    .then(function(data) {
      return res.send(200, data);
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  return {
    registUser: registUser,
    retrieveUserList: retrieveUserList,
    login: login,
    loginInterface: loginInterface,
    adminLoginInterface: adminLoginInterface,
    checkCookies: checkCookies,
  };
};