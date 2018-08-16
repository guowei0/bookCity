define(['jquery'], function($) {
    return function(obj) {
        var ops = $.extend({}, {
            tag: 'span',
            classname: 'active'
        }, obj);
        change(ops.index);
        $(ops.parent).find(ops.tag).on('click', function() {
            change($(this).index());
        });

        function change() {
            $(ops.parent).find(ops.tag).eq(ops.index).addClass('active').siblings().removeClass(ops.classname);
        }
    }
});