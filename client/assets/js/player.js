this.Client = this.Client || {};

(function(scope){
    var $ = scope.$,
        _ = scope._;

    var Player = Backbone.View.extend({

        tagName: 'div',

        attributes: {
            class: "player"
        },

        initialize : function(config) {
            this.config = config;
            this.app = config.app;

            this.template = config.app.getTemplate("partials/player");
        },

        render: function() {

            this.$el.append(this.template({

            }));


            return this;
        }

    });

    scope.Client.Player = Player;

})(this);