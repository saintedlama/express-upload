var util = require('util'),
    error = require('../error');

module.exports = function(mimeTypes, file, cb) {
    if (!file.type) {
        return cb(error('Empty mime type is not accepted for upload', 'accept'));
    }
    
    if (!util.isArray(mimeTypes)) {
        mimeTypes = [mimeTypes];
    }

    for (var i=0;i<mimeTypes.length;i++) {
        var mimeType = mimeTypes[i];
        
        if (util.isRegExp(mimeType)) {
            if (mimeType.test(file.type)) {
                return cb(undefined, file);
            }
        } else {
            if (mimeType.toLowerCase() == file.type.toLowerCase()) {
                return cb(undefined, file);
            }
        }
    }

    return cb(error('Mime type ' + file.type + ' is not accepted for upload'), 'accept');
}