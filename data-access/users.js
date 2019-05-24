const UserModel = require('../model/user');

class  AccessUser {

   async _checkDuplicate(email) {
    let count = await UserModel.countDocuments({email: email});
    if(count){
     return true;
    }
    return false;
   };


   async _createUser(userData){
    let newUser = new UserModel(userData);
    newUser.password = newUser.generateHash(userData.password);
    
    let createUser = await newUser.save();
    return createUser;
   };

   async _loginUser(userData) {
     let UserDetails = await UserModel.findOne({ email: userData.email }).select('-isDeleted -__v -updatedAt -createdAt').lean();
     if(!UserDetails) return false;
     else {
      let user = new UserModel();
      let isMatched = await user.verifyPassword(userData.password, UserDetails.password );
      if (isMatched) return UserDetails
      else return false   
   }

}

}

module.exports = new AccessUser();

