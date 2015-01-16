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
     * Событие отпускания клавиши.
     * @type {number}
     */
    this.EVENT_KEY_UP = 7;

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
    this.eventNames[this.EVENT_KEY_UP] = 'keyup';

    /**
     * Стэк родителей.
     * На верхуши стэка находиться элемент в который будет добавлены новые элементы.
     * @type {Array}
     */
    var parentsStack = [];

    /**
     * Инициализация.
     * - установим родителя, это будет тело документа.
     */
    this.init = function () {
        parentsStack.push(document.body);
    };

    /**
     * Создаёт элемент
     * @param name {string} имя элемента Element*
     * @param params {object} параметры присваиваемые при создании элемента.
     * @param parentDom {GUIDom} необязательный параметр, родительский дом, который будет использован в пределах инициализации элемента.
     * @returns {__ElementName__}
     */
    this.createElement = function (name, params, parentDom) {
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
        if (parentDom) {
            GUI.pushParent(parentDom);
        }
        element.init();
        if (parentDom) {
            GUI.popParent();
        }
        return element;
    };

    /**
     * Добавляем на верхушку стэка - родителя.
     * @param parentDom {Element}
     * @return {Number} длина стэка родителей.
     */
    this.pushParent = function (parentDom) {
        return parentsStack.push(parentDom.__dom);
    };

    /**
     * Убираем с верхушки стэка дом родителя.
     * @returns {Element}
     */
    this.popParent = function () {
        return parentsStack.pop();
    };

    /**
     * Возвращает текущего родителя, т.е. с верхушки стэка.
     * @returns {Element}
     */
    this.getCurrentParent = function () {
        return parentsStack[parentsStack.length - 1];
    };

    /**
     * Создаёт дом, инициализирует его и возвращает на него ссылку.
     * @param parent {GUIDom} родитель, в который будет добавлен дом.
     * @returns {GUIDom}
     */
    this.createDom = function (parent) {
        var dom;
        dom = new GUIDom(parent);
        dom.init(undefined, parent);
        return dom;
    };

    /**
     * Создаёт дом инпута, иницализирует его и возврщает на него ссыслку.
     * @param parent {GUIDom} родитель, в который будет добавлен дом.
     * @returns {GUIDom}
     */
    this.createInput = function (parent) {
        var dom;
        dom = new GUIDom();
        dom.init('input', parent);
        return dom;
    };

    /**
     * Првязываем событие к домЭлементы
     * @param dom {GUIDom} к кому привязываем событие.
     * @param eventId {int} id события GUIDom.EVENT_*
     * @param callback {function}
     * @param context {Object}
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