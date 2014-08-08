var fs = require('fs-extra'),
    aws = require("aws-sdk"),
    util = require("util"),
    events = require("events"),
    glob = require("glob"),
    _ = require("underscore"),
    tmp = require("tmp"),
    musicmetadata = require('musicmetadata'),
    crypto = require('crypto'),
    path = require('path'),
    ffmpeg = require('fluent-ffmpeg');

;


/**
 * Create a sync object and process a folder
 *
 * @param  {Object} config
 * @param  {String} path
 *
 * @return {Sync}
 */
 module.exports.process = function(config, path) {
    var s = new Sync(config);

    return s.processFolder(path);
};




/**
 * Constructor
 * @param {Object} config
 */
var Sync = function(config){
    this.config = config;

    this.s3 = null;

    this.queue = {};

    this.init();
};

// we will emout events
util.inherits(Sync, events.EventEmitter);

/**
 * extensions we can convert
 * @type {Array}
 */
Sync.extensions = [
    'mp3',
    'm4a'
];

Sync.STATUS = {
    ERROR: -1,
    PROCESS_METADATA: 1,
    CONVERTING: 2,
    UPLOADING: 3,
    COMPLETE: 4
};


/**
 * Initalize a sync object
 *
 * @return void
 */
Sync.prototype.init = function() {

    // create our tmp dir
    // that is
    if (!fs.existsSync("/tmp/music")) {
        fs.mkdirSync("/tmp/music");
    }

    // set our key and secret
    // to the gloal AWS object
    aws.config.update({
            accessKeyId: this.config.aws.key,
            secretAccessKey: this.config.aws.secret
    });

    // create a new S3 object
    // we don't have any options so we can ignore
    // these for now
    this.s3 = new aws.S3({});

};


/**
 * search a folder for files we know how to
 * deal with
 *
 * @param  {String} folder folder path
 *
 * @return self
 */
Sync.prototype.processFolder = function(folder) {

    // use our glob wrapper to find files we can work with
    var files = this.glob(folder);

    // loop through each file and
    // process it
    _.each(files, function(file){

        this.processFile(file);

    }.bind(this));


    return this;
};


/**
 * process a file
 *
 * @param  {String} file
 *
 * @return self
 */
Sync.prototype.processFile = function(file) {
    var uid = this.md5(file);

    // copy the file to our tmp fir
    var tmp = this.copyToTmp(file, uid);

    // add this file to our queue
    this.queue[uid] = {
        uid: uid,
        tmp: tmp,
        file: null,
        status: Sync.STATUS.PROCESS_METADATA,
        meta: {},
        progress: 0,
        parser: null
    };

    // parse the files metadata
    this.queue[uid].parser = this.parseFileMetadata(tmp, function(metadata){

        this.queue[id].meta = metadata;

        // we now rewrite the file without
        // any meta
        this.coverToOgg(tmp, "/tmp/music/"+uid+".ogg", function(dest){
            this.queue[id].meta = metadata;
        });

    });

    return uid;
};

Sync.prototype.coverToOgg = function(tmp, dest, done) {
    try {
        ffmpeg(tmp)
            .output(dest)
            .on('end', function(){
                done.call(this, dest);
            }.bind(this));
    } catch (e) {
        console.log(e);
    }
};

Sync.prototype.parseFileMetadata = function(tmp, done) {
    var metadata = {};

    console.log(tmp);

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
        done.call(this, metadata);
    }.bind(this));

    return parser;
};


Sync.prototype.copyToTmp = function(orig, uid) {
    var ext = path.extname(orig);
    var tmp = path.resolve("/tmp/music/", 'raw-'+uid+ext);
    fs.copySync(orig, tmp);
    return tmp;
};

Sync.prototype.md5 = function(str) {
    return crypto.createHash('md5').update(str).digest("hex");
}

/**
 * find all files of interest in a folder path
 * this is resursive by default, so all subfolders
 * are also searched
 */
Sync.prototype.glob = function(folder) {
    var files = [];

    // loop through each known extension
    // and merge any unique files
    _.each(Sync.extensions, function(ext){
        files = _.union(files, glob.sync(folder + "/*." + ext));
    });

    return files;
}


// export a version for ourself
module.exports.Sync = Sync;