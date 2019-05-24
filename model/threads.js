const mongoose = require('mongoose');

let threadSchema = mongoose.Schema({
    title: {
        type: String
    },
    
    description: {
        type: String
    },

    tags: [String],

    userId:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'users'
    }
},{
    timestamps: true
});


let threadModel = mongoose.model('threads', threadSchema, 'threads')
module.exports = threadModel