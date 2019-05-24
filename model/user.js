const mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      saltRounds = 10;


let userSchema = mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
},{
    timestamps: true
});



userSchema.methods.generateHash = (password) => {
  let hash = bcrypt.hashSync(password, saltRounds);
  return hash
};



userSchema.methods.verifyPassword = (password, hashPassword) => {
return bcrypt.compare(password, hashPassword);
};
  

let userModel = mongoose.model('users', userSchema, 'users')
module.exports = userModel