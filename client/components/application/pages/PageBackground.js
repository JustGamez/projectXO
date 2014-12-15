/**
 * Страница бэкграудна.
 * @constructor
 */
PageBackground = function PageMain() {
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
     * Элемент-текст отображающий количество онлайн игроков.
     * @type {ElementGraphicText}
     */
    this.elementOnlineIndicator = null;

    /**
     * Элемент-текст отображает количество очков игрока.
     * @type {ElementGraphicText}
     */
    this.elementScoreIndicator = null;

    this.init = function () {
        var element;
        /* Задний фон */
        element = GUI.createElement('ElementImage', {
            x: 0,
            y: 0,
            width: 788,
            height: 685,
            src: '/images/table.png'
        });
        self.elements.push(element);
        /* online indicator */
        element = GUI.createElement('ElementGraphicText', {
            x: 570,
            y: 425,
            text: 'онлайн: -'
        });
        self.elements.push(element);
        self.elementOnlineIndicator = element;
        /* score indicator */
        element = GUI.createElement('ElementGraphicText', {
            x: 570,
            y: 455,
            text: 'очки: -'
        });
        self.elements.push(element);
        self.elementScoreIndicator = element;
    };

    /**
     * Покажем все элементы на странице.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
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
        for (var i in self.elements) {
            self.elements[i].hide();
        }
    };

    /**
     * Обновляем онлайн индикатор и индикатор очков.
     */
    this.redraw = function () {
        var onlineCount, score;
        if (!showed)return;
        onlineCount = LogicUser.getOnlineCount();
        score = LogicUser.getCurrentUser().score;
        self.elementOnlineIndicator.updateText('онлайн: ' + (typeof onlineCount == 'number' ? onlineCount : '-'));
        self.elementScoreIndicator.updateText('очки: ' + (typeof score == 'number' ? score : '-'));
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
