define(['jquery', 'tab', 'get', 'template', 'swiper'], function($, tab, get, template, Swiper) {
    function gethtml(url) {
        var str = '';
        get(url, function(html) {
            str = html;
        });
        return str;
    }

    function chengViews(html, data, parent) {

        $(parent).parent().find('.change-btn').on('click', function() {
            var n = +$(this).attr('data-page');
            n++;
            var len = data.length;
            var pagesize = Math.ceil(len / 5);
            n = n % pagesize;
            $(this).attr('data-page', n);
            template(html, data.slice(n * 5, n * 5 + 5), parent);
        });
    }

    function scrollload(pagenum, nshtml) {
        pagenum++;
        if (pagenum >= 4) {
            $('.loading').html('已经到底了...');
            return false;
        }
        var clitentHeight = $('.main').height();
        var loadingHeight = $('.loading').height();
        $('.main').on('scroll', function() {
            var contHeight = $(this).children().height() - loadingHeight;
            if (clitentHeight + $(this).scrollTop() > contHeight) {
                $(this).off('scroll');
                get('/api/bookcityLoad?pagenum=' + pagenum, function(data) {
                    var data = JSON.parse(data);
                    template(nshtml, data.items, '.load-cont', 'scroll');
                    scrollload(pagenum, nshtml);
                })
            }
        });
    }
    return function(info) {
        tab({
            parent: '.header',
            tag: 'a',
            index: info.index
        });
        get(info.url, function(data) {
            var data = JSON.parse(data);
            //渲染轮播和其它大盒子
            template(info.context, data.items[0], '.main');
            new Swiper('.banner', {
                loop: true,
                autoplay: true
            });
            //本周最火
            var dlhtml = gethtml('/views/dl.html');
            template(dlhtml, data.items[1].data, '.week-hot>div');
            //重磅推荐
            var zbData = data.items[2].data.data;
            var zbhtml = gethtml('/views/tuijian.html');
            template(zbhtml, zbData.slice(0, 5), '.zb-cont');
            chengViews(zbhtml, zbData, '.zb-cont');
            //女生最爱
            var nshtml = gethtml('/views/imginfo.html');
            var nsData = data.items[3].data.data;
            template(nshtml, nsData.slice(0, 5), '.ns-cont');
            chengViews(nshtml, nsData, '.ns-cont');
            //男生最爱
            var manData = data.items[4].data.data;
            template(nshtml, manData.slice(0, 5), '.man-cont');
            chengViews(nshtml, manData, '.man-cont');
            //限时免费
            template(dlhtml, data.items[5].data, '.xs-cont');
            var pagenum = 0;
            scrollload(pagenum, nshtml);
        });
    }
});