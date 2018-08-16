require.config({
    baseUrl: '/js/',
    paths: {
        //插件
        jquery: 'lib/jquery-3.2.1.min',
        page: 'lib/page',
        handlebars: 'lib/handlebars.min',
        swiper: 'lib/swiper-4.3.3.min',
        //页面
        index: 'app/index',
        bookcity: 'app/bookcity', //书城
        bookshelf: 'app/bookshelf', //书架
        //路由接口
        route: 'route/index',
        //公用方法
        tab: 'common/tab',
        get: 'common/get',
        template: 'common/template'
    }
});

require(['route']);