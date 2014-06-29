var fs = require('fs');
var mm = require('musicmetadata');

var id3 = require('id3-writer');
var writer = new id3.Writer();

var parser = mm(fs.createReadStream('test.mp3'), { duration: true });

var mp3 = new id3.File('test.mp3');


// listen for the metadata event
parser.on('metadata', function (result) {
  console.log(result);


var meta = new id3.Meta({
    'artist': ''
});

writer.setFile(mp3).write(meta, function(err) {

    if (err) {
        console.log(err);
    }

    // Done
});

});


