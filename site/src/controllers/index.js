/**
 * Index
 *
 *
 */


module.exports = function(app) {

    app.get("/", function(req, res){


        res.send("hello");

    }.bind(this));

};