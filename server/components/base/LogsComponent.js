/**
 * Компонент логирования.
 */
LogsComponent = function () {
    var self = this;
    var typeTitles = {};
    /* человеко-читаемые типы логов. */
    typeTitles[LogsComponent.LEVEL_DETAIL] = 'detail';
    typeTitles[LogsComponent.LEVEL_NOTIFY] = 'notify';
    typeTitles[LogsComponent.LEVEL_WARNING] = 'warning';
    typeTitles[LogsComponent.LEVEL_ERROR] = 'error';
    typeTitles[LogsComponent.LEVEL_FATAL_ERROR] = 'fatal error';

    /**
     * Уровень срабатывания по умолчанию
     * @type {number} LogsComponent.TYPE_*
     */
    this.level = LogsComponent.LEVEL_DETAIL;

    /**
     * Сюда и проходят логи.
     * @param message сообщение
     * @param level тип
     * @param details детали
     */
    this.inLog = function (message, level, details) {
        var date, timestamp, logText, levelTitle;
        if (!level)level = LogsComponent.LEVEL_DETAIL;
        if (level < self.level)return;
        date = new Date();
        timestamp = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        details = JSON.stringify(details);
        levelTitle = typeTitles[level];
        logText = timestamp + ' ' + levelTitle + ' ' + message;
        if (details) logText += ' ' + details;
        console.log(logText);
        if (level == LogsComponent.LEVEL_FATAL_ERROR) {
            process.exit();
        }
    };

    this.switchOn = function () {
    };

    this.switchOff = function () {
    };
};

/* константы типов логов */
/**
 * Детально.
 */
LogsComponent.LEVEL_DETAIL = 1;
/**
 * Оповещение.
 */
LogsComponent.LEVEL_NOTIFY = 2;
/**
 * Внимание.
 */
LogsComponent.LEVEL_WARNING = 3;
/**
 * Ошибка.
 */
LogsComponent.LEVEL_ERROR = 4;
/**
 * Фатальная ошибка.
 */
LogsComponent.LEVEL_FATAL_ERROR = 5;

/**
 * Компонент тестирования.
 * должен быть вконце схемы.
 */
LogsComponent.TestComponent = function () {
    var self = this;

    this.outLog1 = null;
    this.outLog2 = null;

    var test = function () {
        var capthMessage, consoleLogTmp, processExitTmp, capthExit;
        // mock console.log function

        consoleLogTmp = console.log;
        console.log = function (message) {
            capthMessage = message;
            capthMessage = capthMessage.replace(/\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{1,2}:\d{1,2}/g, 'DATE-TIME');
        };

        processExitTmp = process.exit;
        process.exit = function () {
            capthExit = true;
        };
        // do some actions and asserts
        var message = "Some message";
        self.outLog1(message);
        // remove replace date-time
        ASSERT.equal(capthMessage, "DATE-TIME detail " + message);

        message = "Some message 2";
        self.outLog1(message, LogsComponent.LEVEL_DETAIL);
        ASSERT.equal(capthMessage, "DATE-TIME detail " + message);

        message = "Some message 3";
        self.outLog1(message, LogsComponent.LEVEL_NOTIFY);
        ASSERT.equal(capthMessage, "DATE-TIME notify " + message);

        message = "Some message 4";
        self.outLog1(message, LogsComponent.LEVEL_WARNING);
        ASSERT.equal(capthMessage, "DATE-TIME warning " + message);

        message = "Some message 5";
        self.outLog1(message, LogsComponent.LEVEL_ERROR);
        ASSERT.equal(capthMessage, "DATE-TIME error " + message);

        message = "Some message 5";
        self.outLog1(message, LogsComponent.LEVEL_DETAIL, "DETAILS");
        ASSERT.equal(capthMessage, "DATE-TIME detail " + message + ' "DETAILS"');

        capthMessage = "no data";
        self.outLog2("check 1");
        ASSERT.equal(capthMessage, "no data");

        self.outLog2("check 2", LogsComponent.LEVEL_WARNING);
        ASSERT.equal(capthMessage, "no data");

        self.outLog2("check 3", LogsComponent.LEVEL_ERROR);
        ASSERT.equal(capthMessage, "DATE-TIME error check 3");

        capthExit = false;
        self.outLog2("Fatal error", LogsComponent.LEVEL_FATAL_ERROR);
        ASSERT.equal(capthExit, true);

        // mock-back console.log function
        process.exit = processExitTmp;
        console.log = consoleLogTmp;
    };

    this.switchOn = function () {
        test();
    };

    this.switchOff = function () {

    };
};

/**
 * Схема для тестирования.
 */
LogsComponent.TestBoardScheme = [
    {
        name: 'Logs1',
        component: 'LogsComponent',
        soldering: {},
        setup: {}
    },
    {
        name: "Logs2",
        component: "LogsComponent",
        soldering: {},
        setup: {
            level: LogsComponent.LEVEL_ERROR
        }
    },
    {
        name: 'test',
        component: 'TestComponent',
        soldering: {
            'outLog1': 'Logs1.inLog',
            'outLog2': 'Logs2.inLog'
        },
        setup: {}
    }
];