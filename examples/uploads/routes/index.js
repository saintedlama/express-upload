var fs = require('fs'),
    upload = require('../../../lib/upload'),
    gm = require('gm');

// Accept only jpeg mime types
// Pump file to graphic magic and resize
// Move file to public/images
var resizeToPublic = upload()
    .accept('image/jpeg')
    .gm(function(gm) {
        return gm.resize(false, 100);
    })
    .to(['public', 'images']);

exports.index = function(req, res) {
    res.render('index', { title : 'Express' });
};

exports.upload = function(req, res) {
    resizeToPublic.exec(req.files.displayImage, function(err, file) {
        if (err) {
            console.log(err);
        } else {
            console.log('Got a file', file, 'uploaded to public/images with name', file.name);
        }
        
        res.redirect('/');
    });
};

// Routing with middleware is done in app.js
exports.uploadUsingMiddleware = function(req, res) {
    console.log('Got a file', req.files.displayImage, 'uploaded to public/images with name', req.files.displayImage.name);
    res.redirect('/');
};