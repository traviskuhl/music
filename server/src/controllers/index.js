var
    _ = require("underscore"),
    fs = require("fs"),
    glob = require("glob"),
    path = require("path")
;

module.exports = function(app) {

    app.route("/")
        .get(function(req, res){
            var file = app.config.client.dir+"/window.html";
            var tplDir = path.resolve(app.config.client.dir+"/templates/")+"/";
            var tpl = {};

            // prerender all templates
            glob.sync(tplDir+"**/**/*.html").forEach(function(file){
                var f = file.replace(tplDir, '').replace('.html', '');
                tpl[f] = _.template(fs.readFileSync(file).toString()).source;
            });

            // get the client app
            res.send(
                _.template(fs.readFileSync(file).toString())({
                    root: "http://localhost:3000/client",
                    templates: JSON.stringify(tpl),
                    config: JSON.stringify({
                        server: {
                            host: "http://localhost:3000",
                            token: "1",
                            version: "1"
                        }
                    })
                })
            );

        });

}