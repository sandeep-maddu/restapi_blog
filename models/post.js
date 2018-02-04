var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  title:{type:String,
  required:true
        },
  author:{type:String,
  required:true
        },
  create_date: {type:Date,
                default: Date.now},
  imageurl:{type:String},
  description:{type:String},
  comments:[{comment_by:String, comment:String}]

})

var Post = module.exports = mongoose.model('Post',postSchema);

//get users
module.exports.getPosts = function(callback, limit) {
  Post.find(callback).limit(limit);
}

//get a post
module.exports.getPostById = function(id, callback) {
  Post.findById(id, callback);
}

//add a post
module.exports.addPost = function(post,callback) {
  Post.create(post,callback);
}

//update a post
module.exports.updatePost = function(id, post, options, callback) {

//   var cmts=[];
//
// // if(post.comments) {
// //   for (let comt in post.comments) {
// //     cmts.push({"comment_by":comt.comment_by, "comment":comt.comment })
// //   }
// // }


  var query={_id:id};
  var update={
    title:post.title,
    author:post.author,
    create_date:post.create_date,
    imageurl:post.imageurl,
    description:post.description,
    comments:post.comments
  }
  Post.findOneAndUpdate(query,update,options,callback);
}

//delete post
module.exports.deletePost = function(id, callback) {
  var query={_id:id};

  Post.remove(query,callback);
}
