var ffmpeg = require('ffmpeg');


var process = new ffmpeg('test.m4a');

process.then(function(audio){

    audio.addCommand('-map 0:a -codec:a copy -map_metadata -1');

    audio.fnExtractSoundToMP3("test.mp3", function(err, file){
        if (err) {
            console.log(err);
        }
    }, function(err){
        console.log(err);
    });

});
