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
        PageController.showPage(pageBefore);
        if (PageController.isShowedNow(PageMain)) {
            LogicUser.setBusy(false);
        }
    };

    var pageBefore;

    /**
     * Действия при нажатии кнопки "(?)"
     */
    this.onButtonHelpClick = function () {
        pageBefore = PageController.getCurrentPage();
        SAPIStatistic.clickHelp();
        LogicUser.setBusy(true);
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
                PageController.showBlocks([PageBlockBackground, PageBlockHelp, PageBlockHelpMainMenu]);
                break;
            case self.TAB_ID_RATING:
                PageController.showBlocks([PageBlockBackground, PageBlockHelp, PageBlockHelpRating]);
                break;
            case self.TAB_ID_RULES:
                PageController.showBlocks([PageBlockBackground, PageBlockHelp, PageBlockHelpRules]);
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