/**
 * Элемент Кард-инфо.
 * @constructor
 */
ElementCardInfo = function () {
    var self = this;

    /**
     * Запоминаем ве кард-инфо, нам надо будет их прятать все сразу, кроме активного.
     * Другими словами: одновренменно отображается только один кард-инфо.
     */
    ElementCardInfo.all.push(self);

    /**
     * Показывать ли элемент.
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
     * Ширина.
     * @type {number}
     */
    this.width = 0;

    /**
     * Высота.
     * @type {number}
     */
    this.height = 0;

    /**
     * Основной фрейм карты.
     * @type {GUIDom}
     */
    var domFrame = null;

    /**
     * Дом онлайн\оффлайн.
     * @type {GUIDom}
     */
    var domOnline = null;

    /**
     * Позиция в рейтинге.
     * @type {GUIDom}
     */
    var domPosition = null;

    /**
     * Очки 15х15 с игроком.
     * @type {GUIDom}
     */
    var dom15x15vsPerson = null;

    /**
     * Очки 3х3 с игроком.
     * @type {GUIDom}
     */
    var dom3x3vsPerson = null;

    /**
     * Очки 15х15 с роботом.
     * @type {GUIDom}
     */
    var dom15x15vsRobot = null;

    /**
     * Очки 3х3 с роботом.
     * @type {GUIDom}
     */
    var dom3x3vsRobot = null;

    /**
     * Рейтинг.
     * @type {null}
     */
    var textRating = null;
    var text15x15vsPerson = null;
    var text3x3vsPerson = null;
    var text15x15vsRobot = null;
    var text3x3vsRobot = null;

    var user = null;

    /**
     * Все элементы и домы, для автоскрытия\показывания.
     * @type {Array}
     */
    var allElements = [];

    /**
     * Создадим нужные нам элементы\домы.
     */
    this.init = function () {

        /* Задний фон */
        domFrame = GUI.createDom(undefined, {
            backgroundImage: '/images/cardInfo/frame.png',
            x: self.x,
            y: self.y,
            zIndex: 100000,
            opacity: 0.87
        });
        allElements.push(domFrame);
        var startY = 5;
        var leftOffset = 5;
        var stepY = 18;
        var column2Offset = 74;
        /* Онлайн\оффлайн */
        domOnline = GUI.createDom(domFrame, {backgroundImage: '/images/cardInfo/textOffline.png', x: leftOffset, y: startY + stepY * 0});
        allElements.push(domOnline);
        /* Позиция */
        domPosition = GUI.createDom(domFrame, {backgroundImage: '/images/cardInfo/textPosition.png', x: leftOffset, y: startY + stepY * 1, title: 'Позиция в рейтинге.'});
        allElements.push(domPosition);
        /* очки 15х15vsPerson */
        dom15x15vsPerson = GUI.createDom(domFrame, {backgroundImage: '/images/cardInfo/image15x15vsPerson.png', x: leftOffset, y: startY + stepY * 2, title: 'Побед 15х15 с человеком.'});
        allElements.push(dom15x15vsPerson);
        /* очки 15x15vsRobot */
        dom15x15vsRobot = GUI.createDom(domFrame, {backgroundImage: '/images/cardInfo/image15x15vsRobot.png', x: leftOffset, y: startY + stepY * 3, title: 'Побед 15х15 с роботом.'});
        allElements.push(dom15x15vsRobot);
        /* очки 3x3vsPerson */
        dom3x3vsPerson = GUI.createDom(domFrame, {backgroundImage: '/images/cardInfo/image3x3vsPerson.png', x: leftOffset, y: startY + stepY * 4, title: 'Побед 3х3 с человеком.'});
        allElements.push(dom3x3vsPerson);
        /* очки 3x3vsRobot */
        dom3x3vsRobot = GUI.createDom(domFrame, {backgroundImage: '/images/cardInfo/image3x3vsRobot.png', x: leftOffset, y: startY + stepY * 5, title: 'Побед 3х3 с роботом.'});
        allElements.push(dom3x3vsRobot);
        /* Текст рейтинга. */
        textRating = GUI.createElement("ElementText", {x: leftOffset + column2Offset, y: startY + stepY * 1, fontSize: 16, bold: true, alignCenter: true, width: 30}, domFrame);
        allElements.push(textRating);
        /* Текст 15х15vsPerson. */
        text15x15vsPerson = GUI.createElement("ElementText", {x: leftOffset + column2Offset, y: startY + stepY * 2, fontSize: 16, bold: true, alignCenter: true, width: 30}, domFrame);
        allElements.push(text15x15vsPerson);
        /* Текст 15x15vsRobot. */
        text15x15vsRobot = GUI.createElement("ElementText", {x: leftOffset + column2Offset, y: startY + stepY * 3, fontSize: 16, bold: true, alignCenter: true, width: 30}, domFrame);
        allElements.push(text15x15vsRobot);
        /* Текст 3x3vsPerson. */
        text3x3vsPerson = GUI.createElement("ElementText", {x: leftOffset + column2Offset, y: startY + stepY * 4, fontSize: 16, bold: true, alignCenter: true, width: 30}, domFrame);
        allElements.push(text3x3vsPerson);
        /* Текст 3x3vsRobot. */
        text3x3vsRobot = GUI.createElement("ElementText", {x: leftOffset + column2Offset, y: startY + stepY * 5, fontSize: 16, bold: true, alignCenter: true, width: 30}, domFrame);
        allElements.push(text3x3vsRobot);
        GUI.bind(domFrame, GUI.EVENT_MOUSE_OVER, function () {
            LogicTimers.clear("CardInfo_" + domFrame.__id);
        }, this);
        GUI.bind(domFrame, GUI.EVENT_MOUSE_OUT, function () {
            self.hideStart();
        }, this);
    };

    /**
     * Покажем элемент.
     */
    this.show = function () {
        LogicTimers.clear("CardInfo_" + domFrame.__id);
        if (showed == true) return;
        showed = true;
        // hide all other before.
        ElementCardInfo.all.forEach(function (e) {
            if (e === self) {
                return;
            }
            e.hide();
        });

        for (var i in allElements) {
            allElements[i].show();
        }

        /* Показать элементы\домы. */
        self.redraw();
    };

    /**
     * Спрячем элемент.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        /* Спрятать элементы\домы. */
        for (var i in allElements) {
            allElements[i].hide();
        }
    };

    /**
     * Перерисуем элемент.
     */
    this.redraw = function () {
        var rating;
        if (!showed) return;
        /* Перерисовка элементов\домов. */
        if (user.online) {
            domOnline.backgroundImage = '/images/cardInfo/textOnline.png';
        } else {
            domOnline.backgroundImage = '/images/cardInfo/textOffline.png';
        }
        rating = LogicUser.getRatingPosition(user.id);
        if (rating !== undefined) {
            textRating.setText(rating.toString());
        } else {
            textRating.setText('-');
        }
        if (user.score15x15vsPerson !== undefined) {
            text15x15vsPerson.setText(user.score15x15vsPerson.toString());
        } else {
            text15x15vsPerson.setText('-');
        }
        if (user.score15x15vsRobot !== undefined) {
            text15x15vsRobot.setText(user.score15x15vsRobot.toString());
        } else {
            text15x15vsRobot.setText('-')
        }
        if (user.score3x3vsPerson !== undefined) {
            text3x3vsPerson.setText(user.score3x3vsPerson.toString());
        } else {
            text3x3vsPerson.setText('-');
        }
        if (user.score3x3vsRobot !== undefined) {
            text3x3vsRobot.setText(user.score3x3vsRobot.toString());
        } else {
            text3x3vsRobot.setText('-');
        }
        for (var i in allElements) {
            allElements[i].redraw();
        }
    };

    this.updateUser = function (givenUser) {
        user = givenUser;
    };

    this.hideStart = function () {
        LogicTimers.start("CardInfo_" + domFrame.__id, Config.ElementCardInfo.hideTimeout, function () {
            self.hide();
        });
    }
};

ElementCardInfo.all = [];