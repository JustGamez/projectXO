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
     * @type {null}
     */
    var currentTabId = null;

    /**
     * Действия при нажатии кнопкаи `(X)`.
     */
    this.onButtonCloseClick = function () {
        SAPIUserState.isNoBusy();
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_CHAT, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_MAIN]);
    };

    /**
     * Действия, при изменении таба.
     * @param value {int}
     * @param index {int}
     */
    this.onTabChanged = function (value, index) {
        currentTabId = value;
        pageController.redraw();
    }
};

/**
 * Константный класс.
 * @type {LogicPageHelp}
 */
LogicPageHelp = new LogicPageHelp();