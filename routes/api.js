var url = require('url');
var mongoose = require('mongoose');
var models = require('../models');
  
var uristring = 
	process.env.MONGOLAB_URI || 
	process.env.MONGOHQ_URL || 
	'mongodb://photosorter:1234554321@ds037508.mongolab.com:37508/photosorter';

mongoose.connect(uristring, function (err, res) {
	if (err) { 
		console.log('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
		console.log('Succeeded connected to: ' + uristring);
	}
});

var auth = function(req, currentId) {
	var userId = req.cookies.userId;
	if (userId === currentId) {
		return userId;
	}
	return false;
};

exports.handleAlbums = function(req, res) {
	var userId = req.cookies.userId;
	models('album').find({ userId: userId }, function (err, result) {
		if (!err) {
			if (!userId) {
				res.end('Unauthorized');
			}
			res.render('albums', { albums: result });
		} else {
			res.end('Error while retrieving album');
		}
	});
};

exports.handleAlbumsId = function(req, res) {
	var id = req.params.id;
	models('album').findById(id, function(err, album) {
		if (!err) {
			var userId = auth(req, album.userId);
			if (!userId) {
				res.end('Unauthorized');
			}
			models('image')().getByAlbumId(album._id, function(err, images) {
				album.images = images;
				res.render('album', { album: album });
			});
		} else {
			res.end('Error while retrieving album');
		}
	});
};

exports.handleAlbumsNew = function(req, res) {
	var userId = req.cookies.userId;
	var params = req.body;
	var newAlbum = models('album')({ name: params.name, userId: userId });
	newAlbum.save(function() {
		res.write('OK');
		res.end();
	});
};

exports.handleImageNew = function(req, res) {
	var userId = req.cookies.userId;
	var albumId = req.params.id;
	var url = req.body.url;
	var image = models('image')({ url: url, albumId: albumId });
	image.save(function() {
		res.write('OK');
		res.end();
	});
};