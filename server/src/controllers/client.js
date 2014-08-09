var
    _ = require("underscore"),
    fs = require("fs"),
    less = require("less"),
    glob = require("glob"),
    path = require("path")
;

module.exports = function(app) {

    app.route("/client/music.js")
        .get(function(req, res){
            res.set("Content-Type", "text/javascript");

            var dir = app.config.client.dir + "/js";

            var files = [
                dir + "/base.js",
                dir + "/app.js",
            ];


            ["/lib", "/controller", "/model", "/plugin"].forEach(function(rel){
                glob.sync(dir + rel +"/*.js").forEach(function(file){
                    files.push(file);
                });
            });

            res.send(_.map(files, function(file){
                return fs.readFileSync(file).toString()
            }).join("\n"));

        });


    app.route("/client/*")
        .get(function(req, res){
            var file = req.path.replace(/client\//, '');
            var root = app.config.client.dir;
            var ext = path.extname(file);

            var mime = {
                ".less": "text/css",
                ".js": "text/javascript",
                ".css": "text/css",
                ".woff": "application/x-font-woff",
                ".ttf": "application/octet-stream",
                ".svg": "image/svg+xml",
                ".eot": "application/vnd.ms-fontobject"
            };

            var body = fs.readFileSync(root + file).toString();

            res.set("Content-Type", mime[ext]);

            if (ext == '.less') {
                var parser = new(less.Parser)({
                  paths: [root+"/less/"]
                });

                parser.parse(body, function(err, tree) {
                    if (err) { console.log(err); }
                    res.send(tree.toCSS({compress:true}));
                });
            }
            else {
                res.send(body);
            }

        });

}