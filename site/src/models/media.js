// Accounts

module.exports = function(app) {
    var Sq = app.Sequelize;

    app.db.define("media", {
        mid: Sq.STRING(32),
        type: Sq.INTEGER,

        // media info
        bucket: Sq.STRING,
        key: Sq.STRING

    });

};