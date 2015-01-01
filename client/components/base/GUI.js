/**
 * Адаптация для работы с гуёй. В данном случае это браузер.
 * Все запросы к гуи должны быть реализованы тут. и тут: GUIDom
 * @constructor
 */
GUI = function () {

    /**
     * Событие нажатия мышы(левой), но не отпускания.
     * @type {number}
     */
    this.EVENT_MOUSE_MOUSE_DOWN = 1;

    /**
     * Событияе отпускания нажатой мыши(левой).
     * @type {number}
     */
    this.EVENT_MOUSE_MOUSE_UP = 2;

    /**
     * Событие нажатие мышкой(левой)
     * @type {number}
     */
    this.EVENT_MOUSE_CLICK = 3;

    /**
     * Событие попадания курсора мыши в фокус
     * @type {number}
     */
    this.EVENT_MOUSE_OVER = 4;

    /**
     * Событие ухода курсора мыши из фокуса.
     * @type {number}
     */
    this.EVENT_MOUSE_OUT = 5;

    /**
     * Событие опускание клавиши.
     * @type {number}
     */
    this.EVENT_KEY_DOWN = 6;

    /**
     * @type {string}
     */
    this.POINTER_HAND = 'hand';

    this.eventNames = [];
    this.eventNames[this.EVENT_MOUSE_MOUSE_DOWN] = 'mousedown';
    this.eventNames[this.EVENT_MOUSE_MOUSE_UP] = 'mouseup';
    this.eventNames[this.EVENT_MOUSE_CLICK] = 'click';
    this.eventNames[this.EVENT_MOUSE_OVER] = 'mouseover';
    this.eventNames[this.EVENT_MOUSE_OUT] = 'mouseout';
    this.eventNames[this.EVENT_KEY_DOWN] = 'keydown';

    /**
     * Создаёт элемент
     * @param name {string} имя элемента Element*
     * @param params {object} параметры присваиваемые при создании элемента.
     * @returns {GUIDom}
     */
    this.createElement = function (name, params) {
        var element;
        if (!window[name]) {
            Logs.log("GUI.createElement: не определен элемент:" + name, Logs.LEVEL_FATAL_ERROR);
        }
        element = new window[name];
        if (!element.init || typeof element.init != 'function') {
            Logs.log("GUI.craeteElement: элемент должен иметь функцию init().", Logs.LEVEL_FATAL_ERROR, arguments);
        }
        if (!element.show || typeof element.show != 'function') {
            Logs.log("GUI.craeteElement: элемент должен иметь функцию show().", Logs.LEVEL_FATAL_ERROR, arguments);
        }
        if (!element.hide || typeof element.hide != 'function') {
            Logs.log("GUI.craeteElement: элемент должен иметь функцию hide().", Logs.LEVEL_FATAL_ERROR, arguments);
        }
        if (!element.redraw || typeof element.redraw != 'function') {
            Logs.log("GUI.craeteElement: элемент должен иметь функцию redraw().", Logs.LEVEL_FATAL_ERROR, arguments);
        }
        for (var i in params) {
            element[i] = params[i];
        }
        element.init();
        return element;
    };

    /**
     * Создаёт дом, инициализирует его и возвращает на него ссылку.
     * @returns {GUIDom}
     */
    this.createDom = function () {
        var dom;
        dom = new GUIDom();
        dom.init();
        return dom;
    };

    /**
     * Создаёт дом инпута, иницализирует его и возврщает на него ссыслку.
     * @returns {GUIDom}
     */
    this.createInput = function () {
        var dom;
        dom = new GUIDom();
        dom.init('input');
        return dom;
    };

    /**
     * Првязываем событие к домЭлементы
     * @param dom {GUIDom} к кому привязываем событие.
     * @param eventId {int} id события GUIDom.EVENT_*
     * @param callback {function}
     */
    this.bind = function (dom, eventId, callback, context) {
        dom.bind(eventId, callback, context);
    };

    /**
     * Заранее загруженные картинки, но с timestampom
     * timestamp вставлять везже сложно, проще сделать это в одном месте.
     * @param url
     * @returns {*}
     */
    this.getImageURL = function (url) {
        if (!window.images[url]) {
            Logs.log("Image url not found for: " + url, Logs.LEVEL_ERROR);
            return '/images/notFound.png';
        }
        return window.images[url];
    };
};
/**
 * Статичный "класс".
 * @type {GUI}
 */
GUI = new GUI();