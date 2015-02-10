var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html')
});

var port = process.env.PORT || 3000;

server.listen(port, function(){
  console.log('Server listening on port ' + port);
});

module.exports = server;
