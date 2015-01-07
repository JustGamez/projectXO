/**
 * Контроллер комадной строки.
 * Обрабатывает команды из коммандной строки.
 * @constructor
 */
CommandLineController = function () {
    /**
     * Текст подсказки для комадной строки.
     * @type {string}
     */
    var helpText = "Use: \r\n" +
        "help - to this text\r\n" +
        "exit or just x - to stop application\r\n" +
        "\r\n";

    /**
     * Инициализация.
     * Привяжем обработчики стандартного ввода.
     * @param afterInitCallback {Function}
     */
    this.init = function (afterInitCallback) {
        /* Control+C */
        process.on('SIGINT', function () {
            showHelp();
        });
        process.stdin.setEncoding('utf8');
        process.stdin.on('readable', function () {
            var chunk = process.stdin.read();
            if (chunk !== null) {
                /* Remove feed line and return carriage */
                chunk = chunk.replace("\r\n", "");
                switch (chunk) {
                    case 'help':
                        console.log('help!!!');
                        showHelp();
                        break;
                    case 'x':
                    case 'exit':
                        process.exit();
                        break;
                    default:
                        log("Unknown command");
                        showHelp();
                        break;
                }
            }
        });
        process.stdin.on('end', function () {
            process.stdout.write('end');
        });
        afterInitCallback();
    };

    /**
     * Вывести подсказку на экран.
     */
    var showHelp = function () {
        process.stdout.write(helpText);
    }
};

/**
 * Статичный класс.
 * @type {CommandLineController}
 */
CommandLineController = new CommandLineController();