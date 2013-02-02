var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    upload = require('../../lib/upload');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/', routes.upload);

app.get('/middleware', routes.index);

// Build an upload instance but don't execute it right now
var uploadDefinition = upload()
    .accept('image/jpeg')
    .gm(function(gm) {
        return gm.resize(false, 100);
    })
    .to(['public', 'images']);

// Define a middleware before image upload
app.post('/middleware', uploadDefinition.middleware('displayImage'), routes.uploadUsingMiddleware);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
