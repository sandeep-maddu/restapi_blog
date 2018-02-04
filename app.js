var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

User = require('./models/User');
Post = require('./models/Post');


//connect to mongoose
mongoose.connect('mongodb://localhost/blogdb');
var db = mongoose.connection;

app.get('/', function(req,res) {
  res.send("Please use /api/blogposts");
});

app.get('/api/users', function(req,res) {
  User.getUsers(function(err,users) {
    if(err)
    {console.log(err);
    }
  res.json(users);
  })

});

app.get('/api/users/:_id', function(req,res) {
  User.getUserById(req.params._id, function(err,user) {
    if(err)
    {console.log(err);
    }
  res.json(user);
  })

});


app.post('/api/users', function(req,res) {
  var user = req.body;

  User.addUser(user, function(err,user) {
    if(err)
    {
      throw err;
      console.log(err);
    }
  res.json(user);
  })

});

app.put('/api/users/:_id', function(req,res) {
  var id=req.params._id;
  var user = req.body;

  User.updateUser(id, user, {}, function(err,user) {
    if(err)
    {
      throw err;
      console.log(err);
    }
  res.json(user);
  })

});

app.delete('/api/users/:_id', function(req,res) {
  var id=req.params._id;

  User.deleteUser(id, function(err,user) {
    if(err)
    {
      throw err;
      console.log(err);
    }
  res.json(user);
  })

});



app.get('/api/posts', function(req,res) {
  Post.getPosts(function(err,posts) {
    if(err)
    {console.log(err);
    }
  res.json(posts);
  })

});


app.get('/api/posts/:_id', function(req,res) {
  Post.getPostById(req.params._id, function(err,post) {
    if(err)
    {console.log(err);
    }
  res.json(post);
  })

});

app.post('/api/posts', function(req,res) {
  var post = req.body;
  Post.addPost(post, function(err,post) {
    if(err)
    {
      throw err;
      console.log(err);
    }
  res.json(post);
  })

});


app.put('/api/posts/:_id', function(req,res) {
  var id=req.params._id;
  var post = req.body;

  Post.updatePost(id, post, {}, function(err,post) {
    if(err)
    {
      throw err;
      console.log(err);
    }
  res.json(post);
  })

});

app.delete('/api/posts/:_id', function(req,res) {
  var id=req.params._id;

  Post.deletePost(id, function(err,post) {
    if(err)
    {
      throw err;
      console.log(err);
    }
  res.json(post);
  })

});


app.listen(3000);
console.log("Listening on port 3000");
