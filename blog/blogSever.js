var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
 
app.use(require('body-parser')());
app.use(express.static(path.resolve(process.env.PWD, 'blog/')));
 
var fileName = path.resolve(process.env.PWD, 'blog/post.json');
 
var server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Blog server listening at", addr.address + ":" + addr.port);
});
 
app.get('/test', function(req,res){res.send("working");});
 
app.get('/posts', function(req, res){
  var postsString = fs.readFileSync(fileName).toString();
  res.send(postsString);
});
 
app.post('/posts', function(req, res){
  var posts = JSON.parse(fs.readFileSync(fileName).toString());
  posts.push({
    title: req.body.title.trim(),
    body: req.body.body.trim()
  });
  var postsString = JSON.stringify(posts);
  fs.writeFileSync(fileName, postsString);
  res.send(postsString);
});