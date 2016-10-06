/**
 * Компонет для работы с социальной сетью(платформой): сайтом http://krestiki-noliki.xyz/
 * @constructor
 */

SocNetStandalone = function () {

    this.init = function (afterInitCallback) {
        afterInitCallback();
    };

    this.detectIsItThat = function () {
        return false;
    };
};

/**
 * Статичный класс.
 * @type {SocNetStandalone}
 */
SocNetStandalone = new SocNetStandalone();