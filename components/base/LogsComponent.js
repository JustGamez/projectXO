/**
 * Компонент логирования.
 */
LogsComponent = function () {
    var self = this;
    var typeTitles = {};
    /* человеко-читаемые типы логов. */
    typeTitles[LogsComponent.TYPE_DETAIL] = 'detail';
    typeTitles[LogsComponent.TYPE_NOTIFY] = 'notify';
    typeTitles[LogsComponent.TYPE_WARNING] = 'warning';
    typeTitles[LogsComponent.TYPE_ERROR] = 'error';
    typeTitles[LogsComponent.TYPE_FATAL_ERROR] = 'fatal error';

    /**
     * Уровень срабатывания по умолчанию
     * @type {number} LogsComponent.TYPE_*
     */
    this.level = LogsComponent.TYPE_DETAIL;

    /**
     * Сюда и проходят логи.
     * @param message сообщение
     * @param level тип
     * @param details детали
     */
    this.inLog = function (message, level, details) {
        var timestamp, logText, levelTitle;
        if (!level)level = LogsComponent.TYPE_DETAIL;
        if (level < self.level)return;
        if (!details)details = null;

        timestamp = new Date().getTime();
        details = JSON.stringify(details);
        levelTitle = typeTitles[level];
        logText = timestamp + ' ' + levelTitle + ' ' + message + ' ' + details;
        console.log(logText);
        if (level == LogsComponent.TYPE_FATAL_ERROR) {
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
LogsComponent.TYPE_DETAIL = 1;
/**
 * Оповещение.
 */
LogsComponent.TYPE_NOTIFY = 2;
/**
 * Внимание.
 */
LogsComponent.TYPE_WARNING = 3;
/**
 * Ошибка.
 */
LogsComponent.TYPE_ERROR = 4;
/**
 * Фатальная ошибка.
 */
LogsComponent.TYPE_FATAL_ERROR = 5;

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

        self.outLog1("Some message 2", LogsComponent.TYPE_DETAIL);
        ASSERT.notEqual(capthMessage.match(/^\d* detail Some message 2 null$/), null);

        self.outLog1("Some message 3", LogsComponent.TYPE_NOTIFY);
        ASSERT.notEqual(capthMessage.match(/^\d* notify Some message 3 null$/), null);

        self.outLog1("Some message 4", LogsComponent.TYPE_WARNING);
        ASSERT.notEqual(capthMessage.match(/^\d* warning Some message 4 null$/), null);

        self.outLog1("Some message 5", LogsComponent.TYPE_ERROR);
        ASSERT.notEqual(capthMessage.match(/^\d* error Some message 5 null$/), null);

        self.outLog1("Some message 5", LogsComponent.TYPE_DETAIL, "DETAILS");
        ASSERT.notEqual(capthMessage.match(/^\d* detail Some message 5 "DETAILS"/), null);

        capthMessage = "no data";
        self.outLog2("check 1");
        ASSERT.equal(capthMessage, "no data");

        self.outLog2("check 2", LogsComponent.TYPE_WARNING);
        ASSERT.equal(capthMessage, "no data");

        self.outLog2("check 3", LogsComponent.TYPE_ERROR);
        ASSERT.notEqual(capthMessage.match(/^\d* error check 3 null/), null);

        capthExit = false;
        self.outLog2("Fatal error", LogsComponent.TYPE_FATAL_ERROR);
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
            level: LogsComponent.TYPE_ERROR
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