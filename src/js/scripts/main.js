var app = app || {};

app.events = (function ($) {
    function init() {
        example();
    }

    function example() {
        console.log('yup!!');
    }

    return {
        init: init
    };
})(jQuery);


var App = (function($, app){
    function init () {
        app.events.init();
    }
    return {
        init: init
    };
})(jQuery, app);
$(function () {
    App.init();
});
