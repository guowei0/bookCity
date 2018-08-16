define(['page', 'index'], function(page, init) {
    page('*', init.start);
    page('/', '/index/bookcity'); //默认进入书城
    page('/index/bookcity', init.bookcity); //书城
    page('/index/bookshelf', init.bookshelf); //书架
    page('*', init.render); //所有
    page(); //调用
})