/**
 * Логика страницы рейтинга.
 * @constructor
 */
LogicPageRating = function () {
    var self = this;

    this.ratingRows = 8;

    this.ratingBegin = 1;
    this.ratingFinish = self.ratingBegin + self.ratingRows;

    this.SHOW_TOP = 1;
    this.SHOW_MY_POSITION = 2;
    this.SHOW_CUSTOM = 3;

    this.showId = self.SHOW_MY_POSITION;

    /**
     * Действия при нажатии на клавишу меню.
     * Не путать с кнопкой меню на главной странице.
     */
    this.onMenuButtonClick = function () {
        LogicUser.setBusy(false);
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_CHAT, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_MAIN]);
    };

    this.onTopButtonClick = function () {
        SAPIStatistic.clickRatingTop();
        self.showId = LogicPageRating.SHOW_TOP;
        pageController.redraw();
    };

    this.onMyPositionButtonClick = function () {
        SAPIStatistic.clickRatingMy();
        self.showId = LogicPageRating.SHOW_MY_POSITION;
        pageController.redraw();
    };

    this.onUpButtonClick = function () {
        SAPIStatistic.clickRatingUp();
        self.showId = LogicPageRating.SHOW_CUSTOM;
        self.ratingBegin -= self.ratingRows;
        pageController.redraw();
    };

    this.onDownButtonClick = function () {
        SAPIStatistic.clickRatingDown();
        self.showId = LogicPageRating.SHOW_CUSTOM;
        self.ratingBegin += self.ratingRows;
        pageController.redraw();
    };

    this.getRatingList = function () {
        switch (self.showId) {
            case LogicPageRating.SHOW_TOP:
                self.ratingBegin = 1;
                break;
            case LogicPageRating.SHOW_MY_POSITION:
                self.ratingBegin = LogicUser.getRatingPosition() - Math.round(self.ratingRows / 2) + 1;
                break;
            case LogicPageRating.SHOW_CUSTOM:
                fitRatingPositions();
                if (self.ratingBegin == 1) {
                    self.showId = LogicPageRating.SHOW_TOP;
                }
                if (self.ratingBegin == LogicUser.getRatingPosition() - Math.round(self.ratingRows / 2) + 1) {
                    self.showId = LogicPageRating.SHOW_MY_POSITION;
                }
                break;
        }
        fitRatingPositions();
        return LogicRating.getByPositionList(LogicPageRating.ratingBegin, LogicPageRating.ratingFinish);
    };

    var fitRatingPositions = function () {
        if (self.ratingBegin < 1) {
            self.ratingBegin = 1;
        }
        if (self.ratingBegin + self.ratingRows >= LogicRating.getLastPosition()) {
            self.ratingBegin = LogicRating.getLastPosition() - self.ratingRows + 1;
        }
        self.ratingFinish = self.ratingBegin + self.ratingRows;
    };
};

/**
 * Констатный класс.
 * @type {LogicPageRating}
 */
LogicPageRating = new LogicPageRating();
