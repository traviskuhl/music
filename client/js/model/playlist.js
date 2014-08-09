(function(root){
    var _ = root._;

    // Music
    root.Music = root.Music || {};
    root.Music.Model = root.Music.Model || {};

    root.Music.Model.Playlist = root.Music.Base.Model.extend({
        _tracks: null,

        defaults: {
            "id": null,
            "meta": {},
            "tracks": []
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


})(this);