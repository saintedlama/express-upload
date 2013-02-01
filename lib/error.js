module.exports = function(err, reason) {
    if (typeof(err) == 'string') {
        err = new Error(err);
    }

    err[reason] = true;
    
    return err;
}
