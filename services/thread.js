const __ = require('../utils/response'),
      ThreadAccess = require('../data-access/thread');

class Threads {

 //-----Add new threads----

   async _postThread(req, res) {
     try {
       req.body.userId = req.userId;

       let result = await ThreadAccess._addThread(req.body);
       if(result) return  __.successMsg(res, 200, result, "Thread added successfully");  
     
     } catch (error) {
       __.errorMsg(res, 500, 'Internal server error', error);
     };
   };

//------get Users threads-----
   async _getThreads(req, res) {
      if(!req.query.limit){
        req.query.limit = 10
       }

      req.query.limit = parseInt(req.query.limit)

       if(req.query.page){
          req.query.page = parseInt(req.query.page)
          req.query.page =  req.query.page - 1
       }

      let skipRec = req.query.page * req.query.limit;
      let text = req.query.name;

       try {
        let threadData = await ThreadAccess._fetchThreads(text, req.userId, skipRec, req.query.limit, req.query.sort);
        return __.successMsg(res,200, threadData, "Thread list");
       } catch (error) {
           __.errorMsg(res, 500, 'Internal server error', error)
       };
   };

   //----------------Update thread-------
    async _updateThread(req, res){
     try {
      let threadData = await ThreadAccess._getThreadById(req.params.id);
      
      if(!threadData) return __.customMsg(res, 404, 'Thread not found');
      await ThreadAccess._updateThreadById(req.params.id, userData, req.body);

      return __.successMsg(res, 200)
     } catch (error) {
       __.errorMsg(res, 500, 'Internal server error', error); 
      };
    };

//---------Delete thread-------
    async _deleteThread(req, res) {
     try {
       let threadData = await ThreadAccess._getThreadById(req.params.id);
       if(!threadData) return __.customMsg(res, 404, 'User not found');

      await ThreadAccess._deleteThreadById(req.params.id);
      return __.successMsg(res, 200);

     } catch (error) {
      __.errorMsg(res, 500, 'Internal server error', error)
     }
    }

};

module.exports = new Threads();