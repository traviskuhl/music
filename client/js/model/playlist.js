(function(root){
    var _ = root._;

    // Music
    root.Music = root.Music || {};
    root.Music.Model = root.Music.Model || {};

    var Model = root.Music.Base.Model.extend({
        _tracks: null,

        defaults: {
            id: null,
            name: null,
            numberOfTracks: 0,
            tracks: []
        },

        url: function(method) {
            return _.indexOf(['read','update'], method) == -1 ? "playlist.json" : "playlist/"+this.get('id')+".json";
        },

        tracks: function() {
            if (!this._tracks) {
                this._tracks = root.Music.Collection.Tracks.forge(this.get("tracks"));
            }
            return this._tracks;
        }

    });

    var Collection = root.Music.Base.Collection.extend({
        model: Model,

        url: function(){
            return "playlist.json";
        }

    });

    root.Music.Model.Playlist = Model;
    root.Music.Collection.Playlist = Collection;

})(this);