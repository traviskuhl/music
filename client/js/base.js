(function(root){
    var Backbone = root.Backbone;
    var _ = root._;

    // Music
    root.Music = root.Music || {};

    /**
     * Base Object
     */
    var Base = {
        _app: null,
        app: function(app) {
            return typeof app !== 'undefined' ? (this._app = app) : this._app;
        }
    };

    Base.View = Backbone.View.extend(_.extend(Base, {


        props: {

        },

        getTemplate: function(name) {
            return eval('('+this.app().templates[name]+')');
        }

    }));


    Base.Model = Backbone.Model.extend(_.extend(Base, {

        sync: function(method, model, opts) {

            opts.url = "/api/0/"+model.url(method);
            opts.type = {"read":"GET", "create": "POST", "update": "PUT", "delete": "DELETE"}[method];

            return $.ajax(opts);
        }

    }));

    Base.Collection = Backbone.Collection.extend(_.extend(Base, {



    }));

    // append back to roo
    root.Music.Base = Base;

})(this);