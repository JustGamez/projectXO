/**
 * Кэш url-ов.
 * @constructor
 */
UrlCache = function () {

    /**
     * Храним промежуточный кэш тут.
     * в будущем надо сделать сбрасываемо-загружаемый кэш в\из БД.
     * с отложенной догрузкой.
     * @type {Array}
     */
    var cache = [];

    /**
     * Вернуть кэшированные данные по ключу.
     * @param key {String}
     * @return {String}
     */
    this.get = function (key) {
        if (cache[key]) {
            return cache[key];
        }
    };

    /**
     * Сохранить кэшированные данные по ключу.
     * @param key {String}
     * @param data {String}
     */
    this.set = function (key, data) {
        cache[key] = data;
    };
};

/**
 * Константный класс.
 * @type {UrlCache}
 */
UrlCache = new UrlCache();