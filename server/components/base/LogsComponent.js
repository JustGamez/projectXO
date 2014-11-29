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
        };

        processExitTmp = process.exit;
        process.exit = function () {
            capthExit = true;
        };
        // do some actions and asserts
        self.outLog1("Some message");
        ASSERT.notEqual(capthMessage.match(/^\d* detail Some message null$/), null);

        self.outLog1("Some message 2", LogsComponent.LEVEL_DETAIL);
        ASSERT.notEqual(capthMessage.match(/^\d* detail Some message 2 null$/), null);

        self.outLog1("Some message 3", LogsComponent.LEVEL_NOTIFY);
        ASSERT.notEqual(capthMessage.match(/^\d* notify Some message 3 null$/), null);

        self.outLog1("Some message 4", LogsComponent.LEVEL_WARNING);
        ASSERT.notEqual(capthMessage.match(/^\d* warning Some message 4 null$/), null);

        self.outLog1("Some message 5", LogsComponent.LEVEL_ERROR);
        ASSERT.notEqual(capthMessage.match(/^\d* error Some message 5 null$/), null);

        self.outLog1("Some message 5", LogsComponent.LEVEL_DETAIL, "DETAILS");
        ASSERT.notEqual(capthMessage.match(/^\d* detail Some message 5 "DETAILS"/), null);

        capthMessage = "no data";
        self.outLog2("check 1");
        ASSERT.equal(capthMessage, "no data");

        self.outLog2("check 2", LogsComponent.LEVEL_WARNING);
        ASSERT.equal(capthMessage, "no data");

        self.outLog2("check 3", LogsComponent.LEVEL_ERROR);
        ASSERT.notEqual(capthMessage.match(/^\d* error check 3 null/), null);

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