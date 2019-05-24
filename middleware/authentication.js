const jwt = require('jsonwebtoken'),
      UserModel = require('../model/user');

class Jwt {
  
  async createToken (userId){
       return jwt.sign({ userId: userId }, process.env.SecretKey, { expiresIn: 60 * 60 * 24 });
  }

  async authentication(req, res, next){
   try {
     
     let decoded = await jwt.verify(req.headers.authorization, process.env.SecretKey);
     if(decoded){
     let verifyUser = await UserModel.countDocuments({_id: decoded.userId});
     
     if (!verifyUser) return res.status(401).json({message: "Illegal access"});
     req.userId = decoded.userId;
     next();

   } 
   } catch (error) {
     return res.status(500).send(error)
   }      
  }

}

module.exports = new Jwt();