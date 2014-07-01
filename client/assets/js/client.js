var Client = Client || {};

(function(scope){
    var $ = scope.$;

    var App = function(){
        this.body = $('body');
        
        this.body.addClass('ready');
    };

    scope.Client.App = App;
    
})(window);