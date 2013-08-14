var models = require('../models');

exports.index = function(req, res) {
	var userId = req.cookies.userId;
	if (!userId) {
		var randomString = (Math.random() * 1024).toString(36).slice(2);
		userId = randomString;

		res.cookie('userId', randomString, { expires: new Date(Date.now() + 900000), httpOnly: true });
	}
	res.render('index');
};

exports.sort = function(req, res) {
	var albumId = req.query.albumId;
	var count = 2;
	var arr = [];
	models('image')().random(albumId, function(err, images) {
		if (!err) {
			console.log(images)
			res.render('sort', { images : images });
		} else {
			res.end('Error loading sorting');
		}
	});
};