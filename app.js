
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/sort', routes.sort);

app.get('/api/albums', api.handleAlbums);
app.get('/api/albums/:id', api.handleAlbumsId);
app.get('/api/albums/:id/votes', api.handleAlbumsVotes);

app.post('/api/albums', api.handleAlbumsNew);
app.post('/api/albums/:id', api.handleImageNew);

app.post('/api/vote', api.handleVote);

app.delete('/api/images/:id', api.handleDeleteImage);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
