var mongoose = require('mongoose');

var voteSchema = new mongoose.Schema({
	vote: { type: mongoose.Schema.Types.ObjectId, ref: 'Images' },
	shownPhotos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Images' }],
	albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Albums' }
});

voteSchema.methods.getByAlbumId = function(albumId, cb) {
	this.model('Votes').find({ albumId : albumId }, function(err, votes) {
		if (!err) {
			cb(votes);
		}
	});
};

module.exports = mongoose.model('Votes', voteSchema);