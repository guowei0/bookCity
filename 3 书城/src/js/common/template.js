define([
    'handlebars',
    'jquery'
], function(handlebars, $) {
    handlebars.registerHelper('num', function(item) {
        return item === 0 ? 1 : '0' + (item + 1);
    })

    return function(text, data, parent, flag) {
        if (flag) {
            $(parent).append(handlebars.compile(text)(data))
        } else {
            $(parent).html(handlebars.compile(text)(data))
        }
    }
});