var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	url		 : String,
	albumId	 : { type: mongoose.Schema.Types.ObjectId, ref: 'Albums' },
	votes	 : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Votes' }]
});

imageSchema.methods.getByAlbumId = function(albumId, cb) {
	return this.model('Images').find({ albumId : albumId }, cb);
};

imageSchema.methods.random = function(albumId, cb) {
	this.model('Images').count({ albumId : albumId }, function(err, count) {
		if (err) {
			return cb(err);
		}
		var rand = Math.floor(Math.random() * (count - 2));
		this.model('Images').find({ albumId: albumId }).skip(rand).limit(2).exec(cb);
	}.bind(this));
};

module.exports = mongoose.model('Images', imageSchema);