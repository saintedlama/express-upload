var fs = require('fs'),
    temp = require('temp'),
    error = require('../error'),
    gm = require('gm');

module.exports = function(gmOperations, file, cb) {
    var tmpPath = temp.path();

    gmOperations(gm(file.path)).write(tmpPath, function(err) {
        if (err) {
            return cb(err);
        }

        var oldPath = file.path;
        fs.unlink(oldPath, function(err) { if (err) { console.log('Removing temporary file', oldPath, 'failed')}});
        
        file.path = tmpPath;
        cb(undefined, file);
    });
}
