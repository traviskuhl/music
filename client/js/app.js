(function(root){
    var Backbone = root.Backbone;
    var _ = root._;

    // Music
    root.Music = root.Music || {};

    /**
     * MusicApp
     */
    var MusicApp = root.Music.Base.View.extend({

        config: {},
        templates: {},

        player: null,

        initialize: function(config) {
            this.el = config.el;

            this.templates = config.templates;

            this.config = config.config; // confusing i know

            this.app(this); // even more confusing

            this.template = this.getTemplate("app");
        },

        render: function() {
            this.$el.html(this.template(this.props));

            this.player = new root.Music.Plugin.Player({
                app: this,
                el: this.$("#hd .player"),
                queue: new root.Music.Model.Playlist({id: 'queue'})
            });

        }

    });


    root.Music.MusicApp = MusicApp;

})(this);