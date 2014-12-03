/**
 * Компонент для работы с базой данных.
 */

/**
 * Подключаем nodeJS модули.
 */
var MYSQL = require('mysql');

DBComponent = function () {
    var self = this;
    this.setup = function (setup) {
        if (setup.host)host = setup.host;
        if (setup.username)username = setup.username;
        if (setup.password)password = setup.password;
        if (setup.database)database = setup.database;
        if (setup.charset)charset = setup.charset;
    };

    this.switchOn = function () {
        init();
    };
    /**
     * Хост с базой данных.
     * @type {string}
     */
    var host = '';
    var username = '';
    var password = '';
    var database = '';
    var charset = '';

    this.outLog = null;
    this.outData = null;

    var connection;
    var isConnected = false;

    this.inQuery = function (query) {
        connection.query(query, onQueryResult);
    };

    var init = function () {
        connection = MYSQL.createConnection({
            host: host,
            user: username,
            password: password,
            database: database,
            charset: charset
        });

        connection.connect(function (err) {
            if (err) {
                self.outLog("Cant connect to DB.", LogsComponent.LEVEL_FATAL_ERROR, err);
            }
            isConnected = true;
            self.outLog("Connect to DB successful.", LogsComponent.LEVEL_NOTIFY);
        });
    };

    var onQueryResult = function (err, rows, fields) {
        if (err) {
            self.outLog("Query error:", LogsComponent.LEVEL_FATAL_ERROR, err);
        }
        self.outData(rows);
    };
};

DBComponent.TestComponent = function () {
    var self = this;
    this.outQuery = null;

    this.inLog = function () {
        console.log(arguments);
        /* dummy */
    };

    this.inData = function (data) {
        ASSERT.equal(data.length, 219);
    };

    this.switchOn = function () {
        // simplest testing.
        self.outQuery("SELECT * FROM COLLATIONS");
    };
};

DBComponent.TestBoardScheme = [
    {
        name: "db",
        component: "DBComponent",
        soldering: {
            'outLog': 'test.inLog',
            'outData': 'test.inData'
        },
        setup: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'information_schema',
            charset: 'utf8'
        }
    },
    {
        name: 'test',
        component: 'TestComponent',
        soldering: {
            'outQuery': 'db.inQuery'
        },
        setup: {}
    }
];
