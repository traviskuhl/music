(function(root){
    var Backbone = root.Backbone;
    var _ = root._;

    // Music
    root.Music = root.Music || {};
    root.Music.Plugin = root.Music.Plugin || {};

    /**
     * Menu
     */
    root.Music.Plugin.Menu = root.Music.Base.View.extend({

        playlists: null,

        initialize: function(config) {
            this.app(config.app);

            // playlists
            this.playlists = new root.Music.Collection.Playlist({

            });

            this.template = this.getTemplate('plugin/menu');

            this.listenTo(this.playlists, 'add', this.render);

            this.playlists.fetch();

        },

        render: function() {

            console.log(this.playlists.length);

            this.$el.html(this.template({
                playlists: this.playlists
            }));

            return this;
        }


    });

})(this);