/**
 * Элемент лента-друзей.
 * Это список друзей, просто напросто.
 * @constructor
 */
ElementFriendsType = function () {
    var self = this;

    /**
     * Показывать ли ленту-друзей.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X.
     * @type {number}
     */
    this.x = 0;

    /**
     * Координата Y.
     * @type {number}
     */
    this.y = 0;

    /**
     * Расстояние между фотографиями.
     * @type {number}
     */
    this.spacing = 0;

    /**
     * Кол-во для отображения фотографий.
     * @type {number}
     */
    this.columns = 5;

    /**
     * Список данных друзей.
     * @type {Array}
     */
    this.friends = [];

    /**
     * Кэллбэк при клики на заглушку.
     * @type {Function}
     */
    this.onClickDummy = null;

    /**
     * Массив элементов фотографий.
     * @type {Array}
     */
    var photos = [];

    /**
     * Массив заглушек.
     * @type {Array}
     */
    var dummies = [];

    /**
     * Создадим графические элемены\домы.
     * - создадим фотографии;
     * - создадим заглушки.
     */
    this.init = function () {
        var photo, dummy;
        /* Создадим элементы фотографий */
        for (var i = 0; i < self.columns; i++) {
            photo = GUI.createElement('ElementPhoto', {
                x: self.x + i * self.spacing,
                y: self.y
            });
            photos[i] = photo;
        }
        /* Создадим заглушки */
        for (var i = 0; i < self.columns; i++) {
            dummy = GUI.createElement('ElementButton', {
                x: self.x + i * self.spacing,
                y: self.y + 8,
                width: 69,
                height: 68,
                title: 'Пригласить друзей.',
                onClick: function () {
                    self.onClickDummy();
                },
                srcRest: '/images/photo/dummy.png',
                srcHover: '/images/photo/dummyHover.png',
                srcActive: '/images/photo/dummyHover.png'
            });
            dummies[i] = dummy;
        }
    };

    /**
     * Покажем ленту-друзей.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        /* Тут show\hide обрабатыает redraw ввиду специфики выборочности элементов для отображения. */
        self.redraw();
    };

    /**
     * Спрячем ленту-друзей.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        for (var i = 0; i < self.columns; i++) {
            photos[i].hide();
            dummies[i].hide();
        }
    };

    /**
     * Перерисуем ленту-друзей.
     */
    this.redraw = function () {
        if (!showed) return;
        for (var i = 0; i < self.columns; i++) {
            if (self.friends[i]) {
                photos[i].update(self.friends[i]);
                photos[i].show();
                photos[i].redraw();
                dummies[i].hide();
            } else {
                photos[i].hide();
                dummies[i].show();
                dummies[i].redraw();
            }
        }
    };

    /**
     * Обновим данные о друзьях.
     * @param givenFriends {Array}
     */
    this.update = function (givenFriends) {
        self.friends = givenFriends;
        self.redraw();
    }
};