var
    express = require('express'),
    app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    fs = require('fs')
;

/* app config */
app.config = {
    client: {
        dir: __dirname+"/../../client"
    }
};

// depend
var glob = require("glob")
;

// load all controllers
glob(__dirname+"/controllers/**/*.js", function(err, files){
    files.forEach(function(file){
        require(file)(app);
    });
});

app.route("/stub/:file")
    .get(function(req, res){
        res.json(JSON.parse(fs.readFileSync(__dirname+"/stub/"+req.params.file).toString()));
    });


app.listen(3000);