var ConnectRoles = require('connect-roles');
var responseUtil = require('../util/response_util');

// var roles = require('./enums/roles');
var userService = require('../service/auth.service')


var user = new ConnectRoles({
  failureHandler: function (req, res, action) {
    console.log('connectrole', action)
    res.status(403).json(responseUtil.failResponse(req, 'Access Denied', 'You don\'t have permission, Access Granted only for ' + action + ' user(s) only'));
  }
});


/******************************
  BY ROLES OR SITUATION
 *****************************/
user.use('logged-in', isLoggedIn);

// ADMIN 
user.use('adminOnly', isAdmin);
user.use('studentOnly', isStudent);


/**
 * 
 * @param {*} req 
 */
function isLoggedIn(req) {
  if(req.headers['auth-token']){
    return true;
  }

}

// /*
// * User should be logged in
// */
// user.use('loggedInUserCheck', function (req) {
//   if (req.loggedUserInfo)
//     return true;
// });


/**
 * 
 * @param {*} req 
 */
function isAdmin(req, res, next) {
  
 if(req.logged_user){
   if(req.logged_user.user_role_id == 1){
     return true;
   } else {
     return false;
   }
 }
  
}

function isStudent(req) {
  // return userService.decodeAuthToken(req.headers['auth-token'])
  //   .then(result =>{
  //     if(result.user_role_id == 2){
        
  //       console.log('Welcome Student!');

  //     }else{
  //       console.log('You\'re not an Student!');
  //     }

  //   })
  if(req.logged_user){
    if(req.logged_user.user_role_id == 2){
      return true;
    } else {
      return false;
    }
  }
}
module.exports = user;