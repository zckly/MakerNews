require('babel-core/register');

var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Post = require('./models/post');
var Comment = require('./models/comment');
var config = require('./config');
var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var _ = require('underscore');

var app = express();

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
  * GET /api/posts
  * Get all the posts for the front page
  *
  */
app.get('/api/posts', function(req, res, next) {
  Post.find()
  .sort( [['_id', -1]] ).limit(30)
  .exec(function(err, posts) {
    if (err) return next(err);
    res.send(posts);
  });
})

/**
  * PUT /api/posts
  * Updates upvote count
  *
  */
app.put('/api/posts', function(req, res, next) {
  var postID = req.body.postID
  Post.findOneAndUpdate( {_id: postID}, {$inc: {upvotes: 1} }, {new: true}, function(err, doc) {
    if (err) return next(err)
    return res.status(200).send(doc)
  })
})

/**
  * POST /api/posts
  * Adds new post to the database
  *
  */
app.post('/api/posts', function(req, res, next) {
  var title = req.body.title;
  var url = req.body.url;
  var tags = req.body.tags;
  var post = new Post({
    title: title,
    url: url,
    tags: tags
  })
  post.save(function(err, post){
    if(err){
      console.log('err ' , err);
      res.status(400).json({status: 'Unsuccessfully saved post', err: err});
    } else {
      res.status(201).json({status: 'Successfully saved post', post: post});
    }
  });
})

//react router shit
app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});