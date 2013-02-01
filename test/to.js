var path = require('path'),
    fs = require('fs'),
    assert = require('assert'),
    to = require('../lib/processors/to');

describe('to', function() {
    it('should move files from source path to target dir', function(done) {
        var sourcePath = path.join(__dirname, 'source', 'source_file_to_remove');
        var targetDir = path.join(__dirname, 'target');

        fs.writeFileSync(sourcePath, 'dummy', 'utf-8');
        try {
            fs.unlinkSync(path.join(targetDir, 'source_file_to_remove'));    
        } catch(e) {
            // Ignore
        }

        to(targetDir, { path : sourcePath }, function(err, file) {
            assert.ifError(err);

            var expectedTargetPath = path.join(targetDir, 'source_file_to_remove');
            
            assert.equal(file.path, expectedTargetPath);
            assert.equal(false, fs.existsSync(sourcePath));
            assert.ok(fs.existsSync(expectedTargetPath));

            done();
        });
    });
});

