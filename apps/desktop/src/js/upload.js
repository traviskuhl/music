var EventEmitter = require('events').EventEmitter,
    util = require('util'),
    path = require('path'),
    glob = require("glob")
;


var Upload = function(app) {
    EventEmitter.call(this);

    this.app = app;

    this.queue = [];

}

// we will trigger events
util.inherits(Upload, EventEmitter);


Upload.prototype.getQueue = function(){
    return this.queue;
}

/**
 * scan a directory for known file types
 * that we can process
 *
 * @param  {String} dir
 *
 * @return {Array}
 */
Upload.prototype.scan = function(dir) {
    var found = [];

    // find all files in this
    found = _.union(found, glob.sync(dir + "/**/*.aiff"));

    return _.map(found, function(file){

        var file = path.normalize(file);

        var obj = {
            guid: _.uniqueId("file"),

            name: path.basename(file),
            dir: path.dirname(file),
            ext: path.extname(file).substring(1),
            size: 0,

            upload: true,

            uploaded: 0,
            status: 0
        };

        obj.format = obj.ext.toUpperCase();

        return obj;
    });

};


/**
 * add a file to the upload queue
 * that doesn't mean it will be upload
 * it just means we know about it
 *
 * @param {Object} file
 *
 */
Upload.prototype.add = function(file) {
    this.queue.push(file);

    // tell anyone listening we added a file
    this.emit("add", file, this);

    return this;
}


/**
 * upload a list of guids from the queue
 *
 * @param  {Array} guids
 *
 */
Upload.prototype.upload = function(guids) {


}

module.exports = function(app) {
    return new Upload(app);
}