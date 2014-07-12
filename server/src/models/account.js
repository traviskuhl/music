// Accounts

module.exports = function(app) {
    var Sq = app.Sequelize;

    app.db.define("account", {
        name: Sq.STRING,
        username: Sq.STRING,
        arn: Sq.STRING,
        key: Sq.STRING,
        secret: Sq.STRING
    });
};