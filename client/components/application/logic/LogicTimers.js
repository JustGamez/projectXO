LogicTimers = function () {
    var self = this;

    /**
     * Массив таймеров.
     * @type {Array}
     */
    var timers = {};

    /**
     * Запускает таймер, если таймер с таким айди есть, то таймер просто продливается до нового таймаута.
     * @param key {String} ключ таймера.
     * @param timeout {Number} время в миллисекундах, через которое сработает таймер.
     * @param callback {Function} калбэк функция, будет вызвана по истечению времени.
     * @param callbackArguments {Mixed} аргументы передаваемые калбэку.
     */
    this.start = function (key, timeout, callback, callbackArguments) {
        /* сохраним\обновим таймер */
        if (!timers[key]) {
            timers[key] = {
                key: key,
                callback: callback,
                arguments: callbackArguments,
                lastTimeoutId: setTimeout(function () {
                    executeTimer(key);
                }, timeout)
            };
        } else {
            /* остановим старый таймаут */
            clearTimeout(timers[key].lastTimeoutId);
            /* установим новый таймайт */
            timers[key].lastTimeoutId = setTimeout(function () {
                executeTimer(key);
            }, timeout);
        }
    };

    /**
     * Запустить таймер.
     * @param key {String} ключ таймера.
     */
    var executeTimer = function (key) {
        if (timers[key]) {
            Logs.log("LogicTimers execute timer with key:" + key);
            timers[key].callback.apply(null, timers[key].arguments);
            LogicTimers.clear(key);
        }
    };

    /**
     * Удалить таймер.
     * @param key {String} ключ таймера.
     */
    this.clear = function (key) {
        if (timers[key]) {
            clearTimeout(timers[key].lastTimeoutId);
            delete timers[key];
        }
    }
};

/**
 * Статичный класс.
 * @type {LogicTimers}
 */
LogicTimers = new LogicTimers();