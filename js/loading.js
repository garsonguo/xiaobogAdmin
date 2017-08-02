/*
loading插件 
作者：郭晓波
时间：2017-07-28
*/
;
(function(root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Loading = factory();
    }

})(this, function() {
    var Loading = {};
    Loading.start = function() {
        var html = '<div class="sh-loading"><div class="mask-loading"></div>' +
            '<div class="loading"><div class="sk-spinner sk-spinner-three-bounce">' +
            '<div class="sk-bounce1"></div><div class="sk-bounce2"></div>' +
            '<div class="sk-bounce3"></div></div></div></div>';
        $('body').prepend(html);
    };
    Loading.end = function() {
        $('body .sh-loading').remove();
    }
    return Loading;
})