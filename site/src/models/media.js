// Accounts

module.exports = function(app) {
    var Sq = app.Sequelize;

    app.db.define("media", {
        account: Sq.INTEGER,

        guid: Sq.UUID,

        // metadata info
        name: Sq.STRING,
        album: Sq.STRING,
        artist: Sq.STRING,
        albumartist: Sq.TEXT,
        year: Sq.INTEGER,
        track: Sq.INTEGER,
        genre: Sq.ARRAY(Sq.STRING),
        albumart: Sq.STRING,

        // media info
        bucket: Sq.STRING,
        key: Sq.STRING

    });

};