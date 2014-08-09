(function(root){
    var Backbone = root.Backbone;
    var _ = root._;

    // Music
    root.Music = root.Music || {};
    root.Music.Plugin = root.Music.Plugin || {};

    /**
     * Player Plugin
     */
    root.Music.Plugin.Player = root.Music.Base.View.extend({
        STATE_PLAYING: 'playing',
        STATE_PAUSED: 'paused',

        events: {
            'click [data-player="play"]': function(e) {
                e.preventDefault();
                this.audio.play();
            },

            'click [data-player="pause"]': function(e){
                e.preventDefault();
                this.audio.pause();
            }
        },

        state: null,

        queue: null,

        audio: null,

        initialize: function(config) {
            this.app(config.app);
            this.el = config.el;

            // no queu we stop
            if (!config.queue) {
                throw "No Queue"; return;
            }

            // audio tag
            $("body").append("<audio></audio>");

            // paused to start
            this.state(this.STATE_PAUSED);

            // globalize our queu wich determins what we play
            // we'll need to listen to events
            this.queue = config.queue;
            this.listenTo(this.queue, 'change', this.queueChange);

            // set our template and render
            this.template = this.getTemplate("plugin/player");
            this.render();

            // inialize our audio handler
            this.audio = new root.Music.Audio($("audio"));

            // listen to all audio events
            // so we can change some stuff
            this.listenTo(this.audio, 'all:audio', this.audioEvent);

            // load our queue now that we have audio
            this.queue
                .fetch();


        },

        render: function() {
            this.$el.html(this.template({


            }));
            return this;
        },

        audioEvent : function(e) {
            switch(e.type) {
                case 'play':
                    this.state(this.STATE_PLAYING); break;
                case 'pause':
                    this.state(this.STATE_PAUSED); break;
                case 'd-progress':
                    this.updateProgress(); break;
                case 'd-timeupdate':
                    this.updateTime(); break;
            };
        },

        queueChange: function(e) {

            this.play(this.queue.tracks().at(0));

        },

        play: function(track) {

            this.audio
                .src(track.get("file"))
                .play();
        },

        state: function(state) {
            if (state) {
                this.$el.attr("data-state", state);
            }
            return this.$el.attr("date-state");
        },

        updateProgress: function() {
            this.$('[data-player="progress"]').width(this.audio.getBufferedPercent()+"%");
        },

        updateTime: function() {
            this.$('[data-player="time"]').width(this.audio.getTimePercent()+"%");
        }


    });


})(this);