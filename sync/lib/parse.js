var
    fs = require('fs-extra'),
    _ = require("underscore"),
    musicmetadata = require('musicmetadata')
;


/**
 * parse meta tags from a file
 *
 * @param  {String} file
 * @param  {Function} done
 *
 * @return void
 */
module.exports = function(file, done) {
    var metadata = {};

    // read our the current meta info
    var parser = musicmetadata(fs.createReadStream(tmp), { duration: true });

    // when we get standard metadata
    parser.on("metadata", function(meta){
        _.extend(metadata, meta);
    }.bind(this));

    // sepecial
    parser.on('TLEN', function(meta){
        _.extend(metadata, meta);
    });

    // we're done parsing
    parser.on('done', function(){
        done(metadata);
    });

}