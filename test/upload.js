var path = require('path'),
    assert = require('assert'),
    upload = require('../lib/upload');

describe('upload', function() {
    describe('constructor', function() {
        it('should allow uploads to be constructed', function() {
            var instance = upload();
            assert.ok(instance);
        });
    });

    describe('#exec', function() {
        it('should require a file given for exec method', function(done) {
            upload().exec(function(err) {
                assert.ok(err);
                done();
            });
        });

        it('should set "noFile" to true in err if no file was given', function(done) {
            upload().exec(function(err) {
                assert.ok(err.noFile);
                done();
            });
        });
    });
});
