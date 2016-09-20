/**
 * Created by rs on 18/09/16.
 */
var mongoose = require('mongoose')
var findOrCreate = require('mongoose-findorcreate');

const musicTrackSchema = mongoose.Schema({
	artistId: String,
	trackId: String,
	artistName: String,
	trackName: String,

	previewUrl: String,
	trackTimeMillis: Schema.Number,
	genre: String
});

const MusicTrack = mongoose.model('MusicTrack', musicTrackSchema);