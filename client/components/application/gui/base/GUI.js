/**
 * Адаптация для работы с гуёй. В данном случае это браузер.
 * Все запросы к гуи должны быть реализованы тут. и тут: GUIDom
 * @constructor
 */
GUI = function () {
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
};
/**
 * Статичный "класс".
 * @type {GUI}
 */
GUI = new GUI();