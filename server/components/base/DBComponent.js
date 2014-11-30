/**
 * Компонент для работы с базой данных.
 */

/**
 * Подключаем nodeJS модули.
 */
var MYSQL = require('mysql');

DBComponent = function () {
    var self = this;
    /**
     * Хост с базой данных.
     * @type {string}
     */
    this.host = '';
    this.username = '';
    this.password = '';
    this.database = '';

    this.switchOn = function () {
        init();
    };

    this.switchOff = function () {

    };

    this.outLog = null;
    this.outData = null;

    var connection;
    var isConnected = false;

    this.inQuery = function (query) {
        connection.query(query, onQueryResult);
    };

    var init = function () {
        connection = MYSQL.createConnection({
            host: self.host,
            user: self.username,
            password: self.password,
            database: self.database,
            charset: self.charset
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
        self.outQuery("SELECT * FROM COLLATIONS");
    };

    this.switchOff = function () {

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
