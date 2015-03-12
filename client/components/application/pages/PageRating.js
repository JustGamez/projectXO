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

    var offsetPhoto = 0;
    var offsetName = 112;
    var offsetPosition = 440;
    var offsetScore15x15vsPerson = 530;
    var widthName = 350;

    this.init = function () {
        var element;
        var ratingListX = 100;
        /* Список рейтинга. */
        element = GUI.createElement('ElementRatingList', {
            x: ratingListX,
            y: 171,
            width: 500,
            rowSpacing: 0,
            rowsCount: 8,
            offsetPhoto: offsetPhoto,
            offsetName: offsetName,
            offsetPosition: offsetPosition,
            offsetScore15x15vsPerson: offsetScore15x15vsPerson,
            widthName: widthName
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
        /* Надпись: "фото" */
        element = GUI.createElement('ElementImage', {
            x: ratingListX + offsetPhoto - 12,
            y: 142 - 7,
            src: '/images/rating/headerPhoto.png'
        });
        self.elements.push(element);
        /* Надпись: "Имя, Фамилия" */
        element = GUI.createElement('ElementImage', {
            x: ratingListX + offsetName - 12 + widthName / 2 - 150 / 2,
            y: 142 - 7,
            src: '/images/rating/headerNameSurname.png'
        });
        self.elements.push(element);
        /* Надпись: "Позиция." */
        element = GUI.createElement('ElementImage', {
            x: ratingListX + offsetPosition - 18,
            y: 142 - 7,
            src: '/images/rating/headerPositionByScore.png'
        });
        self.elements.push(element);
        /* Очки 15х15 с персонажом */
        element = GUI.createElement('ElementImage', {
            x: ratingListX + offsetScore15x15vsPerson,
            y: 142,
            src: '/images/rating/headerScore15x15vsPerson.png',
            title: 'Побед 15х15 с человеком.'
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
                    title: user.firstName + " " + user.lastName,
                    showButtonInvite: false,
                    enableButtonInvite: false,
                    showButtonLetsPlay: false,
                    showIndicatorWaiting: false,
                    onClick: function (photoInfo) {
                        window.open(SocNet.getUserProfileUrl(photoInfo.socNetTypeId, photoInfo.socNetUserId), '_blank');
                    },
                    onButtonInviteClick: null,
                    onButtonLetsPlayClick: null,
                    user: user
                },
                name: user.firstName + " " + user.lastName,
                score15x15vsPerson: user.score15x15vsPerson,
                score3x3vsPerson: user.score3x3vsPerson,
                score15x15vsRobot: user.score15x15vsRobot,
                score3x3vsRobot: user.score3x3vsRobot,
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
