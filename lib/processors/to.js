var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    mkdirp = require('mkdirp');

// TODO: Too much sync used here!
module.exports = function(options, file, cb) {
    options = options || {};

    if (typeof(options) == 'string') {
        options = { targetDir : options };
    } else if (util.isArray(options)) {
        options = { targetDir : path.join.apply(undefined, options) };
    }

    if (!fs.existsSync(options.targetDir)) {
        mkdirp.sync(options.targetDir);
    }

    var filename = path.basename(file.path);
    if (file.name) {
        var ext = path.extname(file.name);
        
        if (ext) {
            filename = filename + ext;
        }
    }
    
    var targetPath = path.join(options.targetDir, filename);

    fs.createReadStream(file.path)
        .pipe(fs.createWriteStream(targetPath))
        .on('err', function() {
            cb(err);
        })
        .on('close', function() {
            // Remove old file and unlink it
            fs.unlink(file.path, function(err) {
                if (err) {
                    return cb(err);
                }

                file.path = targetPath;
                file.name = filename;

                cb(undefined, file); 
            });
        });
}

