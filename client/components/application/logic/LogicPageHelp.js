/**
 * Логика страницы помощи.
 * @constructor
 */
LogicPageHelp = function () {
    var self = this;

    /**
     * id таба: Основное меню.
     * @type {number}
     */
    this.TAB_ID_MAIN_MENU = 1;

    /**
     * id таба: рейтинг.
     * @type {number}
     */
    this.TAB_ID_RATING = 2;

    /**
     * id таба: правила.
     * @type {number}
     */
    this.TAB_ID_RULES = 3;

    /**
     * id текущего, выбраного таба.
     * @type {int}
     */
    var currentTabId;

    /**
     * Действия при нажатии кнопкаи `(X)`.
     */
    this.onButtonCloseClick = function () {
        SAPIUserState.isNoBusy();
        pageController.showPages(pageIdBefore);
    };

    var pageIdBefore = [];
    /**
     * Действия при нажатии кнопки "(?)"
     */
    this.onButtonHelpClick = function () {
        pageIdBefore = pageController.currentPageIds();
        SAPIStatistic.clickHelp();
        SAPIUserState.isBusy();
        LogicPageHelp.showPageAndTab();
    };

    /**
     * Действия, при изменении таба.
     * @param value {int}
     * @param index {int}
     */
    this.onTabChanged = function (value, index, elementInit) {
        currentTabId = value;
        /* @todo костыль конечно, но пока так. Так быстрей, ничего не поделаешь :).
         * Должен же у нас быть хотя бы один костыль :)
         * Во всяком случае это первый костыль :) проблема Саб-таба.
         */
        if (!elementInit) {
            self.showPageAndTab();
        }
    };

    /**
     * Возвращает текущий id таба.
     * @returns {int}
     */
    this.getCurrentTabId = function () {
        return currentTabId;
    };

    /**
     * Показать страницу основных элементов и страницу "таба".
     * @todo Немного костыльно, но зато быстро.
     */
    this.showPageAndTab = function () {
        switch (LogicPageHelp.getCurrentTabId()) {
            case self.TAB_ID_MAIN_MENU:
                pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_HELP, PageController.PAGE_ID_HELP_MAIN_MENU]);
                break;
            case self.TAB_ID_RATING:
                pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_HELP, PageController.PAGE_ID_HELP_RATING]);
                break;
            case self.TAB_ID_RULES:
                pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_HELP, PageController.PAGE_ID_HELP_RULES]);
                break;
            default:
                Logs.log("Попытка отобразить не существующий таб хелпа.", Logs.LEVEL_FATAL_ERROR, LogicPageHelp.getCurrentTabId());
                break;
        }
    }
};

/**
 * Константный класс.
 * @type {LogicPageHelp}
 */
LogicPageHelp = new LogicPageHelp();