var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	url		 : String,
	albumId	 : mongoose.Schema.Types.ObjectId
});

imageSchema.methods.getByAlbumId = function(albumId, cb) {
	return this.model('Images').find({ albumId : albumId }, cb);
};

imageSchema.methods.random = function(albumId, cb) {
	this.model('Images').count({ albumId : albumId }, function(err, count) {
		if (err) {
			return cb(err);
		}
		var rand = Math.floor(Math.random() * count);
		this.model('Images').findOne({ albumId: albumId }).skip(rand).exec(cb);
	}.bind(this));
};

module.exports = mongoose.model('Images', imageSchema);