/**
 * Контроллер страниц.
 * @constructor
 */
PageController = function () {
    var self = this;
    /**
     * Все страницы.
     * @type {Array}
     */
    var pages = [];

    /**
     * Id отображенных в данный момент страниц.
     * @type {Array}
     */
    var currentShowedPageIds = [];

    /**
     * Добавляет страницу.
     * @param id {Number} id PageController.PAGE_ID_*
     * @param page {object} страница.
     */
    this.addPage = function (id, page) {
        pages[id] = page;
        if (!page.init) {
            Logs.log("PageController.addPage. page must have method init(). Page constructor:" + page.constructorName, Logs.LEVEL_FATAL_ERROR);
        }
        if (!page.show) {
            Logs.log("PageController.addPage. page must have method show(). Page constructor:" + page.constructorName, Logs.LEVEL_FATAL_ERROR);
        }
        if (!page.hide) {
            Logs.log("PageController.addPage. page must have method hide(). Page constructor:" + page.constructorName, Logs.LEVEL_FATAL_ERROR);
        }
        if (!page.redraw) {
            Logs.log("PageController.addPage. page must have method redraw(). Page constructor:" + page.constructorName, Logs.LEVEL_FATAL_ERROR);
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
        currentShowedPageIds = idToShowList;
        self.redraw();
    };

    /**
     * Вызывает редрей всех активных страниц.
     */
    this.redraw = function () {
        for (var id in pages) {
            pages[id].redraw();
        }
    };

    /**
     * Показаны ли сейчас эта страница.
     * @param pageId {Number} id Страницы.
     */
    this.isShowedNow = function (pageId) {
        for (var i in currentShowedPageIds) {
            if (pageId == currentShowedPageIds[i]) {
                return true;
            }
        }
        return false;
    };

    this.currentPageIds = function () {
        var out = [];
        currentShowedPageIds.forEach(function (isShowed, id) {
            if (isShowed) {
                out.push(id);
            }
        });
        return out;
    };
};