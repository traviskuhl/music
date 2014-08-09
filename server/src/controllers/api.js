var
    _ = require("underscore"),
    fs = require("fs"),
    less = require("less"),
    glob = require("glob"),
    path = require("path")
;

module.exports = function(app) {

    app.route("/api/0/*")
        .get(function(req, res){
            res.set("Content-Type", "application/json");
            var file = req.path.replace("/api/0/", '').replace('/','_');
            res.json(JSON.parse(fs.readFileSync(__dirname+"/../stub/"+file).toString()));
        });


}