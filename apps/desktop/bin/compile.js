var glob = require("glob"),
    less = require('less'),
    hb = require('handlebars'),
    path = require('path'),
    fs = require('fs'),
    ncp = require('ncp').ncp
;

// open the client hbs 
var root = path.normalize(__dirname+'/..');
var src = path.normalize(__dirname+'/../src');
var clientDir = path.normalize(__dirname + '/../../../client');

// output dir
var output = src+'/client';


if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
}


// get our file
var tpl = hb.compile( fs.readFileSync(clientDir + '/client.hbs').toString() );

fs.writeFileSync(output+"/client.html", tpl({
    scripts: [
        "app://music/client/vendor.js",
        "app://music/client/client.js"
    ],
    style: [
        "app://music/client/client.css"
    ],
    config: JSON.stringify({
        server: {

        },
        loader: {
            root: "app://music/client/",
            version: (new Date()).getTime()
        }
    })
}));

ncp(clientDir+"/assets/fonts", output+"/fonts");

glob(clientDir+"/assets/**/*.*", function(err, files) {
    var js = [], jsv = [], lss = [], css = [];

    files.forEach(function(file){                
        switch(path.extname(file)) {
            case '.less': 
                lss.push(fs.readFileSync(file).toString()); break;
            case '.css':
                css.push(fs.readFileSync(file)); break;
            case '.js':
                if (file.indexOf('vendor') !== -1) {
                    jsv.push(fs.readFileSync(file));
                }
                else {
                    js.push(fs.readFileSync(file));
                }
                break;
        };
    });

    less.render(lss.join(""), function (err, out) {
        if (err) { return console.error(err); }                    
        fs.writeFileSync(output+"/client.css", css.join("\n\n")+"\n\n"+out);
    });
    
    fs.writeFileSync(output+"/client.js", js.join("\n\n"));
    fs.writeFileSync(output+"/vendor.js", jsv.join("\n\n"));
    
});

ncp(clientDir+"/views", output+"/views");