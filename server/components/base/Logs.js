/**
 * Компонент логирования.
 * Клиент-серверный компонент!
 */
Logs = function () {
    var self = this;

    /**
     * Уровень срабатывания.
     * @type {number} Logs.LEVEL_*
     */
    var trigger_level = null;

    this.setup = function (setup) {
        if (setup.level) {
            trigger_level = setup.level;
        }
    };

    /**
     * Сюда и проходят логи.
     * @param message {string} сообщение.
     * @param level {int} тип Logs.LEVEL_*.
     * @param [details] {*} необязательный параметр, детали.
     */
    this.log = function (message, level, details) {
        var date, dateFormated, logText, levelTitle;
        // если не передан уровень, то считаем его детальным.
        if (!level) {
            level = Logs.LEVEL_DETAIL;
        }
        // если уровень лога ниже уровня срабатывания ничего не делаем.
        if (level < trigger_level)return;
        // сформируем сообщение лога.
        date = new Date();
        // тут мы получим "01-01-2014 15:55:55"
        var day, month, year, hour, minutes, seconds;
        year = date.getFullYear();
        day = str_pad(date.getDate());
        month = str_pad(date.getMonth() + 1);
        hour = str_pad(date.getHours());
        minutes = str_pad(date.getMinutes());
        seconds = str_pad(date.getSeconds());
        dateFormated = day + '-' + month + '-' + year + ' ' + hour + ':' + minutes + ':' + seconds;
        // превратим в строку переданные детали лога.
        details = JSON.stringify(details);
        // превратим уровень лога из константы в человеко-читаемый текст.
        levelTitle = typeTitles[level];
        // соединим время, текст уровня лога и сообщение лога в одну строку
        logText = dateFormated + ' ' + levelTitle + ' ' + message;
        // добавим к тексту лога детали, если они были переданы
        if (details) logText += ' ' + details;
        // выведем на экран
        console.log(logText);
        // если это фатальная ошибка - завершим работу программы.
        if (level == Logs.LEVEL_FATAL_ERROR) {
            throw new Error("Vse polamalos'!");
        }
    };

    /**
     * Дополним нулями значение и вернёт строку
     * Тут это специфичная функция, дополнит нулями число спереди до 2ух знаков.
     * @param sourceValue {Mixed}
     */
    var str_pad = function (sourceValue) {
        return "00000".substr(0, 2 - sourceValue.toString().length) + sourceValue;
    };

    /* константы типов логов */

    /**
     * Детально.
     */
    this.LEVEL_DETAIL = 1;

    /**
     * Оповещение.
     */
    this.LEVEL_NOTIFY = 2;

    /**
     * Внимание.
     */
    this.LEVEL_WARNING = 3;

    /**
     * Ошибка.
     */
    this.LEVEL_ERROR = 4;

    /**
     * Фатальная ошибка.
     */
    this.LEVEL_FATAL_ERROR = 5;

    var typeTitles = {};
    /* человеко-читаемые типы логов. */
    typeTitles[this.LEVEL_DETAIL] = 'detail';
    typeTitles[this.LEVEL_NOTIFY] = 'notify';
    typeTitles[this.LEVEL_WARNING] = 'warning';
    typeTitles[this.LEVEL_ERROR] = 'error';
    typeTitles[this.LEVEL_FATAL_ERROR] = 'fatal error';
};
/**
 * Статичный класс.
 * @type {Logs}
 */
Logs = new Logs();