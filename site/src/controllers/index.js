/**
 * Index
 *
 *
 */

var fs = require("fs")
    glob = require("glob"),
    less = require("less"),
    path = require("path");

module.exports = function(app) {

    app.get("/", function(req, res){
        var file = path.normalize(app.clientDir + 'client.hbs');

        res.set('Content-Type', 'text/html');
        res.render(file, {
            scripts: [
                "/client/asset/vendor.js",
                "/client/asset/client.js"
            ],
            style: [
                "/client/asset/vendor.css",
                "/client/asset/client.css"
            ],
            config: JSON.stringify({
                server: {
                    host: "localhost",
                    port: 3000
                },
                loader: {
                    root: "/client/loader",
                    version: (new Date()).getTime()
                }
            })
        });
        

    }.bind(this));

    app.get("/client/asset/:file", function(req, res) {
        var file = req.params.file;
        var ext = path.extname(file);
        var name = path.basename(file, ext);
        var dir = (name == 'vendor' ? 'vendor/' : "");

        var folder = ext == '.css' ? [app.clientDir+'/assets/less/',dir,'*.*'] : [app.clientDir+'/assets/js/',dir,'*.js'];
        

        glob( folder.join(""), function(err, files) {
            var js = [], lss = [], css = [];

            files.forEach(function(file){                
                switch(path.extname(file)) {
                    case '.less': 
                        lss.push(fs.readFileSync(file).toString()); break;
                    case '.css':
                        css.push(fs.readFileSync(file)); break;
                    case '.js':
                        js.push(fs.readFileSync(file)); break;
                };
            });
            if (ext == '.css') {
                res.set("Content-Type", "text/css");
                if (lss.length > 0) {                
                    less.render(lss.join(""), function (err, out) {
                        if (err) { return console.error(err); }                    
                        res.send(css.join("\n")+out);
                    });
                }
                else {
                    res.send(css.join("\n"));
                }
            }
            else {
                res.set("Content-Type", "text/javascript");
                res.send(js.join("\n"));
            }

        });

    });

};