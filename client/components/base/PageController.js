/**
 * Контроллер страниц.
 * @constructor
 */
PageController = function () {
    var pages = [];

    /**
     * Добавляет страницу.
     * @param id {Number} id PageController.PAGE_ID_*
     * @param page {object} страница.
     */
    this.addPage = function (id, page) {
        pages[id] = page;
        if (!page.constructor.name) {
            Logs.log("PageController.addPage. page must have constructor.name.", Logs.LEVEL_FATAL_ERROR, page);
        }
        if (!page.init) {
            Logs.log("PageController.addPage. page must have method init(). Page constructor:" + page.constructor.name, Logs.LEVEL_FATAL_ERROR);
        }
        if (!page.show) {
            Logs.log("PageController.addPage. page must have method show(). Page constructor:" + page.constructor.name, Logs.LEVEL_FATAL_ERROR);
        }
        if (!page.hide) {
            Logs.log("PageController.addPage. page must have method hide(). Page constructor:" + page.constructor.name, Logs.LEVEL_FATAL_ERROR);
        }
        if (!page.redraw) {
            Logs.log("PageController.addPage. page must have method redraw(). Page constructor:" + page.constructor.name, Logs.LEVEL_FATAL_ERROR);
        }
        page.init();
    };

    /**
     * Показать страницу, все остальные скрыть.
     * @param idToShowList {Array}
     */
    this.showPages = function (idToShowList) {
        Logs.log("Pages to show:" + idToShowList.toString(), Logs.LEVEL_DETAIL);
        var tmp = [];
        for (var i in idToShowList) {
            tmp[idToShowList[i]] = idToShowList[i];
        }
        idToShowList = tmp;
        /* show pages */
        for (var id in idToShowList) {
            pages[id].show();
        }
        /* hide all other */
        for (var id in pages) {
            if (tmp[id])continue;
            pages[id].hide();
        }
    };

    /**
     * Вызывает редрей всех активных страниц.
     */
    this.redraw = function () {
        for (var id in pages) {
            pages[id].redraw();
        }
    }
};