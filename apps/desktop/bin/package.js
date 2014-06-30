var path = require("path")
    fs = require("fs"),
    fse = require('fs-extra'),
    exec = require('child_process').exec
;


require("./compile.js");

var NwBuilder = require('node-webkit-builder');

var src = path.normalize(__dirname + "/../src/");
var builds = path.normalize(__dirname+"/../builds");

if (!fs.existsSync(builds)) {
    fs.mkdirSync(builds);
}

var version = builds+"/0.1/";

// create our version folder
fs.mkdirSync(version);

// copy osx
fse.copySync(builds+"/osx/", version);

var app = version+"/node-webkit.app/Contents/Resources/app.nw/";

fse.mkdirsSync(app);

fse.copySync(src, app);

// fse.move(
//     version+'/node-webkit.app',
//     version+'/music.app',
//     function(err) {
//         if (err) return console.error(err);
//         console.log("success!");
//     }
// );

// exec('mv -r '+version+'/node-webkit.app '+version+'/music.app',function (error, stdout, stderr) {
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + stderr);
//     if (error !== null) {
//       console.log('exec error: ' + error);
//     }
// });