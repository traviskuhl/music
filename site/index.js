var app = require('express')()
var server = require('http').Server(app);
var io = require('socket.io')(server);

// depend
var glob = require("glob")
    hbs  = require('express3-handlebars')   
;

// handlebars
app.engine('hbs', hbs({
    extname:'hbs'
}));

app.clientDir = __dirname + '/../client/';

// define db on our app
require(__dirname+"/src/lib/db.js")(app, function() {});

// load all controllers
glob(__dirname+"/src/controllers/**/*.js", function(err, files){
    files.forEach(function(file){
        require(file)(app);
    });
});


app.listen(3000);