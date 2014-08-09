(function(root){
    var Backbone = root.Backbone;
    var _ = root._;

    // Music
    root.Music = root.Music || {};
    root.Music.Model = root.Music.Model || {};

    var Model = root.Music.Base.Model.extend({

        defaults: {
            id: null,
            title: null,
            file: null,
            artist: {},
            album: {}
        }

    });


    var Collection = root.Music.Base.Collection.extend({
        model: Model
    });

    Collection.forge = function(items) {
        var c = new Collection();
        _.each(items, function(item){
            c.push(new Model(item));
        });
        return c;
    };

    root.Music.Model.Track = Model;
    root.Music.Collection.Tracks = Collection;

})(this);