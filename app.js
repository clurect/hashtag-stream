
var Twitter = require('node-tweet-stream');
var cfg = require('./config.json');
var t = new Twitter(cfg);
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('./index.html');
});
t.on('tweet', function (tweet) {
  console.log('tweet received: ', tweet.text);
  io.emit('tweet', tweet.text);
})

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


t.on('error', function (err) {
  console.log('Oh no')
})

t.track('#nomanssky');

http.listen(8080, function(){
  console.log('listening on *:8080');
});
