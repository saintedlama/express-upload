var fs = require('fs'),
    temp = require('temp'),
    error = require('../error'),
    gm;

try {
    gm = require('gm');
} catch (e) {
    console.log('gm is not detected on your system!');
}

module.exports = function(gmOperations, file, cb) {
    var tmpPath = temp.path();

    if (!gm) {
        return cb(error('Gm dependency is not installed. Use "npm install gm" to use gm operations', 'gm'));
    }

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
