var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	url		 : String,
	albumId	 : { type: mongoose.Schema.Types.ObjectId, ref: 'Albums' },
	votes	 : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Votes' }]
});

imageSchema.methods.getByAlbumId = function(albumId, cb) {
	return this.model('Images').find({ albumId : albumId }).populate('votes').exec(function(err, images) {
		if (!err) {
			var comparer = function(a,b) {
				if (a.rank < b.rank)
					return 1;
				if (a.rank > b.rank)
					return -1;
				return 0;
			}

			images.sort(comparer);
			cb(images);
		}
	});
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

imageSchema.methods.getById = function(imageId, cb) {
	this.model('Images').findOne({ _id: imageId }).populate('votes').exec(function(err, image) {
		if (!err) {
			cb(image);
		}
	});
};

imageSchema.virtual('rank').get(function() {
	var positiveCount = 0;
	var negativeCount = 0;
	var obj = this;
	obj.votes.forEach(function(value) {
		if (value.vote.toString() == obj._id.toString()) {
			positiveCount++;
		} else {
			negativeCount++;
		}
	});
	return positiveCount - negativeCount;
});

module.exports = mongoose.model('Images', imageSchema);