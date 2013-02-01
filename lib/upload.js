var async = require('async'),
    processors = require('./processors'),
    error = require('./error');

// TODO: Upload multiple scenario
// upload.parallel().exec(req.files).to(target);
module.exports = function() {
    return new Upload();
}

var Upload = function() {
    this.chain = [];
}

Upload.prototype.accept = function(mimeTypes) {
    this.chain.push(processors.accept.bind(null, mimeTypes));
    return this;
}

Upload.prototype.to = function(targetDir) {
    this.chain.push(processors.to.bind(null, targetDir));
    return this;
}

Upload.prototype.gm = function(gmOperations) {
    this.chain.push(processors.gm.bind(null, gmOperations));
    return this;
}

Upload.prototype.process = function(fn) {
    this.chain.push(fn);
    return this;
}

Upload.prototype.exec = function(file, cb) {
    // TODO: Simplify...
    if (!file || typeof(file) == 'function' || file.size == 0) {
        var errCallback = cb || file;

        return errCallback(error('No file was given to upload', 'noFile'));
    }

    // Copy array and add waterfall generating method
    var chain = this.chain.slice(0);
    chain.unshift(function(cb) {
        cb(undefined, file);
    });

    async.waterfall(chain, cb);
    
    // Allow chaining another upload
    return this;
}