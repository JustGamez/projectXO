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
     * @param idToShow {Number}
     */
    this.showPage = function (idToShow) {
        Logs.log("Page show:" + idToShow, Logs.LEVEL_DETAIL);
        for (var id in pages) {
            if (idToShow == id) {
                pages[id].show();
            } else {
                pages[id].hide();
            }
        }
    };
    /**
     * Вызывает редрей всех активных страниц.
     */
    this.redraw = function(){
        for (var id in pages) {
            pages[id].redraw();
        }
    }
};