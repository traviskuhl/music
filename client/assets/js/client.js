this.Client = this.Client || {};

(function(scope){
    var $ = scope.$,
        _ = scope._;

    var App = Backbone.View.extend({

        el: "body",

        initialize: function(config) {
            this.config = config;

            this.template = this.getTemplate('app');


            // player
            this.player = new Client.Player({app: this});



            this.render();
        },  

        render: function() {

            this.$el.append(this.template({

            }));

            this.$el.addClass('ready');


            this.$("#ft").append(
                    this.player.render().el
                );

            return this;
        },

        getTemplate : function(name) {
            return _.template(this.config.templates[name]);
        }

    });

    scope.Client.App = App;
    
})(this);