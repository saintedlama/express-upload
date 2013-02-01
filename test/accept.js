var path = require('path'),
    assert = require('assert'),
    accept = require('../lib/processors/accept');

describe('accept', function() {
    it('should allow string parameter', function(done) {
        accept('audio/mp4', { type : 'audio/mp4'}, function(err) {
            assert.ifError(err);
            done();
        });
    });

    it('should allow array parameter', function(done) {
        accept(['audio/mp4'], { type : 'audio/mp4'}, function(err) {
            assert.ifError(err);
            done();
        });
    });

    it('should allow regex parameter', function(done) {
        accept([/audio.*/], { type : 'audio/mp4'}, function(err) {
            assert.ifError(err);
            done();
        });
    });

    it('should match regex parameter', function(done) {
        accept([/audio.*/], { type : 'image/jpeg'}, function(err) {
            assert.ok(err);
            done();
        });
    });

    it('should not match wrong mime types', function(done) {
        accept(['audio/mp4', 'audio/ogg', 'image/jpeg'], { type : 'audio/mp3'}, function(err) {
            assert.ok(err);
            done();
        });
    });

    it('should not match wrong parts of mime types', function(done) {
        accept(['audio/mp4', 'audio/ogg', 'image/jpeg'], { type : 'audio/mp'}, function(err) {
            assert.ok(err);
            done();
        });
    });

    it('should not match undefined mime type', function(done) {
        accept(['audio/mp4', 'audio/ogg', 'image/jpeg'], { }, function(err) {
            assert.ok(err);
            done();
        });
    });

    it('should match case insensitive', function(done) {
        accept(['audio/mp4', 'audio/ogg', 'image/jpeg'], { type : 'Audio/MP4' }, function(err) {
            assert.ifError(err);
            done();
        });
    });
});
