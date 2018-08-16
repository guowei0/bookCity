define(['jquery', 'tab', 'get'], function($, tab, get) {
    return function(info) {
        tab({
            parent: '.header',
            tag: 'a',
            index: info.index
        });
        // get(info.url, function(data) {
        //     var
        // })
        $('.main').html(info.context);
    }
});