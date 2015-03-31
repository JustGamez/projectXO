/**
 * Страница шаблон.
 * @constructor
 */
PageRating = function PageRating() {
    var self = this;

    /**
     * Показывать ли страницу.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    /**
     * Элемент списка рейтинга.
     * @type {ElementRatingList}
     */
    var elementRatingList = null;

    var offsetPhoto = 10;
    var offsetName = 112;
    var offsetPosition = 465;
    var offsetRatingInfo = 538;
    var widthName = 350;

    /**
     * Стрелка выбора: моя позиция, топ игроков.
     * @type {ElementImage}
     */
    var elementArrow = null;

    this.init = function () {
        var element;
        var offsetY = 15;
        var ratingListX = 100;
        /* Список рейтинга. */
        element = GUI.createElement(ElementRatingList, {
            x: ratingListX,
            y: 171 + offsetY,
            width: 500,
            rowSpacing: 0,
            rowsCount: 8,
            offsetPhoto: offsetPhoto,
            offsetName: offsetName,
            offsetPosition: offsetPosition,
            offsetRatingInfo: offsetRatingInfo,
            widthName: widthName
        });
        self.elements.push(element);
        elementRatingList = element;
        /* Кнопка меню */
        element = GUI.createElement(ElementButton, {
            x: 521,
            y: 75 + offsetY,
            srcRest: '/images/buttons/menuRest.png',
            srcHover: '/images/buttons/menuHover.png',
            srcActive: '/images/buttons/menuActive.png',
            onClick: LogicPageRating.onMenuButtonClick
        });
        self.elements.push(element);
        /* Текст заголовка. */
        /* Надпись: "фото" */
        element = GUI.createElement(ElementImage, {
            x: ratingListX + offsetPhoto - 12,
            y: 142 - 7 + offsetY,
            src: '/images/rating/headerPhoto.png'
        });
        self.elements.push(element);
        /* Надпись: "Имя, Фамилия" */
        element = GUI.createElement(ElementImage, {
            x: ratingListX + offsetName - 12 + widthName / 2 - 150 / 2,
            y: 142 - 7 + offsetY,
            src: '/images/rating/headerNameSurname.png'
        });
        self.elements.push(element);
        /* Надпись: "Позиция." */
        element = GUI.createElement(ElementImage, {
            x: ratingListX + offsetPosition - 18,
            y: 142 - 7 + offsetY,
            src: '/images/rating/headerPositionByScore.png'
        });
        self.elements.push(element);
        element = GUI.createElement(ElementButton, {
            x: 144,
            y: 85 + offsetY,
            srcRest: '/images/rating/buttonTop.png',
            srcHover: '/images/rating/buttonTopHover.png',
            srcActive: '/images/rating/buttonTopHover.png',
            onClick: LogicPageRating.onTopButtonClick
        });
        self.elements.push(element);
        element = GUI.createElement(ElementButton, {
            x: 144,
            y: 115 + offsetY,
            srcRest: '/images/rating/buttonMyPosition.png',
            srcHover: '/images/rating/buttonMyPositionHover.png',
            srcActive: '/images/rating/buttonMyPositionHover.png',
            onClick: LogicPageRating.onMyPositionButtonClick
        });
        self.elements.push(element);
        element = GUI.createElement(ElementButton, {
            x: 335,
            y: 84 + offsetY,
            srcRest: '/images/rating/buttonDownRest.png',
            srcHover: '/images/rating/buttonDownHover.png',
            srcActive: '/images/rating/buttonDownActive.png',
            onClick: LogicPageRating.onDownButtonClick
        });
        self.elements.push(element);
        element = GUI.createElement(ElementButton, {
            x: 377,
            y: 84 + offsetY,
            srcRest: '/images/rating/buttonUpRest.png',
            srcHover: '/images/rating/buttonUpHover.png',
            srcActive: '/images/rating/buttonUpActive.png',
            onClick: LogicPageRating.onUpButtonClick
        });
        self.elements.push(element);
        element = GUI.createElement(ElementImage, {
            x: 114,
            y: 130 + offsetY,
            src: '/images/rating/arrow.png'
        });
        elementArrow = element;
        self.elements.push(element);
    };

    /**
     * Покажем все элементы на странице.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].show();
        }
        self.redraw();
    };

    /**
     * Спрачем все элементы на странице.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        for (var i in self.elements) {
            self.elements[i].hide();
        }
    };

    /**
     * Настройка перед отрисовкой.
     */
    this.preset = function () {
        var ratingList, rating, usersList, user;
        ratingList = LogicPageRating.getRatingList();
        usersList = [];
        for (var i in ratingList) {
            rating = ratingList[i];
            user = LogicUser.getById(rating.userId);
            usersList.push({
                user: user,
                position: rating.position
            });
        }
        elementRatingList.update(usersList);
    };

    /**
     * Обновляем онлайн индикатор и индикатор очков.
     */
    this.redraw = function () {
        if (!showed) return;
        self.preset();
        switch (LogicPageRating.showId) {
            case LogicPageRating.SHOW_TOP:
                elementArrow.y = 100;
                elementArrow.show();
                break;
            case LogicPageRating.SHOW_MY_POSITION:
                elementArrow.y = 130;
                elementArrow.show();
                break;
            case LogicPageRating.SHOW_CUSTOM:
                elementArrow.hide();
                break;
        }
        elementArrow.redraw();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
