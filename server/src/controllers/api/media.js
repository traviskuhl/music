module.exports = function(app){



    // upload (possibly) new media
    app.post("api/0/media.json", function(req, res){

        res.json(['poop']);

    });

};