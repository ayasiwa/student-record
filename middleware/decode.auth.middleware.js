var responseUtil = require('../util/response_util');

var userService = require('../service/auth.service')



module.exports = function(req, res, next){
  return userService.decodeAuthToken(req.headers['auth-token'])
  .then(result =>{
    req.logged_user = result;
    next();
  })

};
