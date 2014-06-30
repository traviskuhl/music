var app = {};

require("../lib/db.js")(app, function(){


    app.db
        .sync({force: true})
        .complete(function(err){
            if (!!err) {
                console.log("Database Init Error", err)
            }
            else {
                console.log("Database Init Complete");
            }
        });

});
