var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name:{type:String,
  required:true
        },
  nickname:{type:String},
  city:{type:String}

})

var User = module.exports = mongoose.model('User',userSchema);

//get users
module.exports.getUsers = function(callback, limit) {
  User.find(callback).limit(limit);
}


//get a user
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

//add a user
module.exports.addUser = function(user,callback) {
  User.create(user,callback);
}

//update a user
module.exports.updateUser = function(id, user, options, callback) {
  var query={_id:id};
  var update={
    name:user.name,
    nickname:user.nickname,
    city:user.city
  }
  User.findOneAndUpdate(query,update,options,callback);
}

//delete user
module.exports.deleteUser = function(id, callback) {
  var query={_id:id};

  User.remove(query,callback);
}
