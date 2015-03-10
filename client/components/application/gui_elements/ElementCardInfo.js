/**
 * Элемент Кард-инфо.
 * @constructor
 */
ElementCardInfo = function () {
    var self = this;

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
     * Создадим нужные нам элементы\домы.
     */
    this.init = function () {

        /* Задний фон */
        domFrame = System.createDom();
        domFrame.backgroundImage = '/images/cardInfo/frame.png';
        /* Позиция */

        domPosition = System.createdom(domFrame);
        domPosition.backgroundImage = '/images/cardInfo/textPosition.png';
        /* очки 15х15vsPerson */
        dom15x15vsPerson = System.createDom(domFrame);
        dom15x15vsPerson.backgroundImage = '/images/cardInfo/text15x15vsPerson.png';
        /* очки 3x3vsPerson */
        dom3x3vsPerson = System.createDom(domFrame);
        dom3x3vsPerson.backgroundImage = '/images/cardInfo/text3x3vsPerson.png';
        /* очки 15x15vsRobot */
        dom15x15vsRobot = System.createDom(domFrame);
        dom15x15vsRobot.backgroundImage = '/images/cardInfo/text15x15vsRobot.png';
        /* очки 3x3vsRobot */
        dom3x3vsRobot = System.createDom(domFrame);
        dom3x3vsRobot.backgroundImage = '/images/cardInfo/text3x3vsRobot.png';
    };

    /**
     * Покажем элемент.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
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
    };

    /**
     * Перерисуем элемент.
     */
    this.redraw = function () {
        if (!showed) return;
        /* Перерисовка элементов\домов. */
    };
};