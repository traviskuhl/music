(function(root){
    var Backbone = root.Backbone;
    var _ = root._;

    // Music
    root.Music = root.Music || {};


    var Audio = function(el) {
        this.$el = el;
        this.el = el.get(0);

        this._deferedEvents = {};

        this.attachEvents();
        this.initialize.apply(this, arguments);
    };

    _.extend(Audio.prototype, Backbone.Events, {

        events: [
            'abort',
            'canplay',
            'canplaythrough',
            'durationchange',
            'emptie',
            'ended',
            'error',
            'loadeddata',
            'loadedmetadat',
            'loadstart',
            'pause',
            'play',
            'playing',
            'progress',
            'ratechange',
            'seeked',
            'seekin',
            'stalled',
            'suspend',
            'timeupdate',
            'volumechang',
            'waiting'
        ],

        deferEvents: [
            "timeupdate",
            "progress"
        ],

        initialize: function() {},

        attachEvents: function() {
            var self = this;
            _.each(this.events, function(name){
                self._deferedEvents[name] = null;
                self.$el.on(name, function(e){

                    // always fire the event
                    self.proxyEvent(e);

                    if (_.indexOf(self.deferEvents, e.type) == -1) {
                        return;
                    }

                    clearTimeout(self._deferedEvents[e.type]);
                    self._deferedEvents[e.type] = setTimeout(function() {
                        e.type = 'd-'+e.type;
                        self.proxyEvent(e);
                    }, 10);

                });
            });
            return this;
        },

        proxyEvent: function(e) {
            e.audio = this;
            this.trigger(e.type, e);
            this.trigger('all:audio', e);

        },

        src: function(file) {
            this.el.src = file;
            this.el.load();
            return this;
        },

        play: function() {
            if (this.el.paused) {
                this.el.play();
            }
            else {
                this.el.pause();
            }
            return this;
        },

        pause: function() {
            this.el.pause();
            return this;
        },

        stop: function() {
            this.el.pause();
            this.el.currentTime = 0;
            return this;
        },

        currentTime: function() {
            return this.el.currentTime;
        },


        getBufferedPercent: function() {
            var buf = this.el.buffered;
            if (buf.length == 0) {return 0;}
            var dur = this.el.duration;
            var end = buf.end(buf.length-1);
            return Math.round(end / dur * 100, 2);
        },

        getTimePercent: function() {
            var dur = this.el.duration;
            var time = this.el.currentTime;
            if (!dur || !time) {return 0;}
            return Math.round(time / dur * 100, 2);
        }

    });

    root.Music.Audio = Audio;

})(this);

