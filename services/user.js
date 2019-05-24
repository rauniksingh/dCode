const __ = require('../utils/response'),
      UserAccess = require('../data-access/users'),
      jwt = require('../middleware/authentication');

class Users {

//-------------Register  User-----------
    async _registerUser(req, res) {
      try {
          let isDup = await UserAccess._checkDuplicate(req.body.email);
          if(isDup) return  __.customMsg(res, 409, `User with ${req.body.email} already exists.`);

          let user = await UserAccess._createUser(req.body);
          user = user.toObject();

          let token = await jwt.createToken(user._id);
          user.token = token;

          if(user) return __.successMsg(res, 200, user, 'User created successfully'); 

     } catch (error) {
         __.errorMsg(res, 500, 'Internal server error', error);      
       };
    };

//---------------Login User----------
   async _LoginUser(req, res) {
      try {
          let userData = await UserAccess._loginUser(req.body);
          if(!userData) return __.customMsg(res, 404, `Incorreect password or email`);
          
          let token = await jwt.createToken(userData._id); 
          userData.token = token;    
          
          delete userData['password'];
          delete userData['_id'];
          
          return __.successMsg(res, 200, userData, 'User logged successfully');
     } catch (error) {
         __.errorMsg(res, 500, 'Internal server error', error);      
       };
    };
 
};

module.exports = new Users();