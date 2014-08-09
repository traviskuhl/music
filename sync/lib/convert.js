var
    ffmpeg = require('fluent-ffmpeg');
;



/**
 * convert a file from * to ogg
 *
 * @param  {String} src
 * @param  {String} dest
 *
 * @return {Boolean}
 */
module.exports.convert = function(src, dest, done) {

    ffmpeg(src)
        .output(dest)
        .on('end', function(){
            done(dest)
        });

}