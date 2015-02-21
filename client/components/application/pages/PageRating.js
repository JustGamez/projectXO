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

    this.init = function () {
        var element;
        /* Список рейтинга. */
        element = GUI.createElement('ElementRatingList', {
            x: 100,
            y: 171,
            width: 500,
            rowSpacing: 0,
            rowsCount: 8
        });
        self.elements.push(element);
        elementRatingList = element;
        /* Кнопка меню */
        element = GUI.createElement('ElementButton', {
            x: 545,
            y: 58,
            width: 162,
            height: 82,
            srcRest: '/images/buttons/ratingMenuRest.png',
            srcHover: '/images/buttons/ratingMenuHover.png',
            srcActive: '/images/buttons/ratingMenuActive.png',
            onClick: LogicPageRating.onMenuButtonClick
        });
        self.elements.push(element);
        /* Текст заголовка. */
        element = GUI.createElement('ElementImage', {
            x: 112,
            y: 142 - 7,
            width: 100,
            height: 40,
            src: '/images/rating/headerPhoto.png'
        });
        self.elements.push(element);
        element = GUI.createElement('ElementImage', {
            x: 230,
            y: 142 - 7,
            width: 150,
            height: 40,
            src: '/images/rating/headerNameSurname.png'
        });
        self.elements.push(element);
        element = GUI.createElement('ElementImage', {
            x: 525,
            y: 142 - 7,
            width: 70,
            height: 40,
            src: '/images/rating/headerScore.png'
        });
        self.elements.push(element);
        element = GUI.createElement('ElementImage', {
            x: 600,
            y: 142 - 7,
            width: 90,
            height: 40,
            src: '/images/rating/headerPositionByScore.png'
        });
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
        ratingList = LogicRating.getTopList();
        usersList = [];
        for (var i in ratingList) {
            rating = ratingList[i];
            user = LogicUser.getUserById(rating.userId);
            usersList.push({
                photoData: {
                    src: user.photo50,
                    title: user.firstName + " " + user.lastName,
                    online: user.online,
                    showButtonInvite: false,
                    enableButtonInvite: false,
                    showButtonLetsPlay: false,
                    showIndicatorWaiting: false,
                    showOnlineIndicator: false,
                    onClick: function (photoInfo) {
                        window.open(SocNet.getUserProfileUrl(photoInfo.socNetTypeId, photoInfo.socNetUserId), '_blank');
                    },
                    onButtonInviteClick: null,
                    onButtonLetsPlayClick: null,
                    photoInfo: {id: user.id, socNetTypeId: user.socNetTypeId, socNetUserId: user.socNetUserId}
                },
                name: user.firstName + " " + user.lastName,
                score: rating.score,
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
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
