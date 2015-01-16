/**
 * Логика страницы рейтинга.
 * @constructor
 */
LogicPageRating = function () {

    /**
     * Действия при нажатии на клавишу меню.
     * Не путать с кнопкой меню на главной странице.
     */
    this.onMenuButtonClick = function () {
        SAPIUserState.isNoBusy();
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_MAIN]);
    };
};

/**
 * Констатный класс.
 * @type {LogicPageRating}
 */
LogicPageRating = new LogicPageRating();