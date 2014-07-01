global.jQuery = jQuery;
global.$ = $;
global._ = _;

var gui = require('nw.gui');
var WindowManager = require('node-webkit-window-manager').windowManager;

var manager = new WindowManager(gui, {
    login: {
        page: "views/login.html",
        options: {
            frame: true,
            toolbar: true,
            width: 300,
            height: 500,
            show: true
        }
    },
    upload: {
        page: "views/upload.html",
        options: {
            frame: false,
            toolbar: false,
            width: 500,
            height: 700,
            show: true
        }
    },
    client: {
        page: "client/client.html",
        options: {
            frame: true,
            toolbar: true,
            width: 1024,
            height: 800,
            show: true
        }
    }
});


/**
 * our application
 *
 * @param {Object} config
 */
var App = function(config) {

    // config will pass us a window manager instance
    this.manager = config.manager;

    // inial configiration we need to use
    this.config = {
        root: process.cwd(),
        src: process.cwd()
    };

    // placeholder for a user account
    this.account = {};

    // create our upload manager
    // this may run in the backround
    this.upload = require(this.config.src+"/js/upload.js")(this);


    // initalize this instanc
    this.init();
};


App.prototype = {

    init: function() {

        // open the dev tools in this window
        gui.Window.get().showDevTools();

        console.log("init");

  //      this.manager.open("upload", {});

    },

    page: function(dom) {
        var html = $(dom);
        var head = html.find("head");

        head.append("<link rel='stylesheet' href='../vendor/bootstrap/css/bootstrap.min.css' type='text/css'>");

        return html.find("body").first();
    },

    log: function() {
        console.log.apply(console, _.toArray(arguments));
    }

};


$(document).ready(function(){
    global.app = new App({
        manager: manager
    });
});