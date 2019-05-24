const ThreadModel = require('../model/threads');

class  AccessThread {

   async _addThread(data) {
        let result = await ThreadModel.create(data);
        return result
   };

   async  _fetchThreads(text, userId, skipRec, limit, sort) {
        let userData; 
        if(text){
           userData = await ThreadModel.find({userId: userId, "title": { "$regex": text, "$options": "i" } }).select(' -updatedAt -__v').populate({path: 'userId', select: 'email -_id'}).sort(sort).skip(skipRec).limit(limit).lean();
        }else{
           userData = await ThreadModel.find({userId: userId}).sort(sort).skip(skipRec).limit(limit).select(' -updatedAt -__v').populate({path: 'userId', select: 'email'}).lean();
        }
        return userData;
   };

   async _getThreadById(id){
     let data;
     var mongoose = require('../node_modules/mongoose');
     
     if(mongoose.Types.ObjectId.isValid(id)){
      data = await ThreadModel.findOne({_id: id}).lean();
     }

     return data
   };

   async _updateUserById(id, threadData, threadObj){
      let updateObj = {...threadData, ...threadObj };
      let thread = await ThreadModel.findOneAndUpdate({ _id: id}, {$set: updateObj});
      return thread
   };

   async _deleteThreadById(id){
      let userData = await ThreadModel.deleteOne({id: id}).lean();
      if (userData) return true
      else return false
   }

};

module.exports = new AccessThread(); 