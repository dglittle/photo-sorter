var models = require('../models');

exports.index = function(req, res) {
	var userId = req.cookies.userId;
	if (!userId) {
		var randomString = Math.random().toString(36).slice(2);
		userId = randomString;

		res.cookie('userId', randomString, { httpOnly: true });
	}
	res.render('index');
};

exports.sort = function(req, res) {
	var albumId = req.query.albumId;
	var count = 2;
	var arr = [];
	models('image')().random(albumId, function(err, images) {
		if (!err) {
			res.render('sort', { images : images });
		} else {
			res.end('Error loading sorting');
		}
	});
};