var mongoose = require('mongoose');

var albumSchema = new mongoose.Schema({
	name	: String,
	userId  : String
});

albumSchema.methods.findById = function(id, cb) {
	return this.model('Albums').find({ _id: id }, cb);
};

albumSchema.methods.getAll = function(cb) {
	return this.model('Albums').find({}, cb);
};

module.exports = mongoose.model('Albums', albumSchema);