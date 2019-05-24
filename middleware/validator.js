const _ = require('lodash'),
      __ = require('../utils/response');

  class Validator {
   //----------------- FOR LOGIN And Signup --------------------
      async login(req, res, next){

          let {login} = require('../constant/enum');
          let objectKeys = Object.keys(req.body);

          let isValid = await Validator._validatorRequest(objectKeys, login, res); 
          if(isValid) return next();

      };

   //-----For Adding threads-----
   async addThread(req, res, next) {
      let { addThread } = require('../constant/enum');
      let objectKeys = Object.keys(req.body);
      
      let isValid = await Validator._validatorRequest(objectKeys, addThread, res); 
      if(isValid) return next();
   }


   static _validatorRequest(objectKeys, enumVal, res) {
       let missingKeys = enumVal.filter((obj) => { return objectKeys.indexOf(obj) == -1; });
       if (missingKeys.length) return __.customMsg(res, 400, `Bad Value. Missing key ${missingKeys[0]}`);
       
       let status = _.isEqual(enumVal.sort(), objectKeys.sort());
       if (status == false ) return __.customMsg(res, 400, `Bad Value. Incorrect Parameter`);

       const filteredObject = _.pickBy(objectKeys, v => v !== null && v !== undefined && v !== "");
       
       if (Object.keys(filteredObject).length !== enumVal.length) {
           return __.customMsg(res, { message: 'null or undefined parameters' })
       }

       return true

    };     
  };

  module.exports = new Validator();

