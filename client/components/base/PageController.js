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
    var blocks = [];

    var lastBlockId = 0;

    /**
     * Добавляет страницу.
     * @param blocksToAdd {array} массив.
     */
    this.addBlocks = function (blocksToAdd) {
        blocksToAdd.forEach(function (block) {
            var newBlockId = lastBlockId++;
            blocks[newBlockId] = {
                block: block,
                showed: false,
                id: newBlockId
            };
            if (!block.init) {
                Logs.log("PageController.addPage. block must have method init(). ", Logs.LEVEL_FATAL_ERROR, block);
            }
            if (!block.show) {
                Logs.log("PageController.addPage. block must have method show().", Logs.LEVEL_FATAL_ERROR, block);
            }
            if (!block.hide) {
                Logs.log("PageController.addPage. block must have method hide()", Logs.LEVEL_FATAL_ERROR, block);
            }
            if (!block.redraw) {
                Logs.log("PageController.addPage. block must have method redraw()", Logs.LEVEL_FATAL_ERROR, block);
            }
            block.init();
        });
    };

    /**
     * Показать страницу, все остальные скрыть.
     * @param pagesToShow {Array}
     */
    this.showBlocks = function (pagesToShow) {
        Logs.log("Pages to show:...", Logs.LEVEL_DETAIL);
        var toShow;
        for (var id in blocks) {
            toShow = false;
            for (var j in pagesToShow) {
                if (blocks[id].block === pagesToShow[j]) {
                    toShow = true;
                }
            }
            if (toShow) {
                if (blocks[id].showed === false) {
                    blocks[id].block.show();
                    blocks[id].showed = true;
                }
            } else {
                if (blocks[id].showed === true) {
                    blocks[id].block.hide();
                    blocks[id].showed = false;
                }
            }
        }

        self.redraw();
    };

    /**
     * Вызывает редрей всех активных страниц.
     */
    this.redraw = function () {
        for (var i in blocks) {
            blocks[i].block.redraw();
        }
    };

    var currentPage;

    this.showPage = function (page) {
        currentPage = page;
        self.showBlocks(page.blocks);
    };

    /**
     * Показаны ли сейчас эта страница.
     * @param page
     */
    this.isShowedNow = function (page) {
        return page === currentPage;
    };

    this.getCurrentPage = function () {
        return currentPage;
    };
};

PageController = new PageController();