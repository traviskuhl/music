var glob = require("glob"),
    Sequelize = require("sequelize")
;

module.exports = function(app, callback) {
    app.Sequelize = Sequelize;

    app.db = new Sequelize('music', 'kuhl', '', {
        dialect: 'postgres'
    });

    app.db
        .authenticate()
        .complete(function(err){
            if (!!err) {
                console.log("Unable to connect to database", err);
                return;
            }

            // load all models
            glob(__dirname+"/../models/**/*.js", function(err, files){
                files.forEach(function(file){
                    require(file)(app);
                });

                callback();

            });

        });

}