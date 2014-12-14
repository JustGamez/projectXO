/**
 * Компонент для работы с базой данных.
 */

/**
 * Подключаем nodeJS модули.
 */
var MYSQL = require('mysql');

DB = function () {
    var self = this;
    /**
     * Cоединение mysql.
     * @type {Connection}
     */
    var connection = null;
    /**
     * Статус соединения.
     * @type {boolean}
     */
    var isConnected = false;
    /**
     * Ппроизведем коннект к БД, согласно конфигурации.
     */
    this.init = function () {
        connection = MYSQL.createConnection({
            host: Config.DB.host,
            user: Config.DB.username,
            password: Config.DB.password,
            database: Config.DB.database,
            charset: Config.DB.charset
        });
        connection.connect(function (err) {
            if (err) {
                Logs.log("Cant connect to DB.", Logs.LEVEL_FATAL_ERROR, err);
            }
            isConnected = true;
            Logs.log("Connect to DB successful.", Logs.LEVEL_NOTIFY);
        });
    };
    /**
     * Выполняет запрос к БД.
     * @param query {string} sql запрос
     * @param callback
     */
    this.query = function (query, callback) {
        connection.query(query, function (err, rows) {
            if (err) {
                Logs.log("Query error:" + query, Logs.LEVEL_FATAL_ERROR, err);
            }
            callback(rows);
        });
    };
    /**
     * Выполняет запрос к БД.
     * @param tableName {string} имя таблица.
     * @param where {object} параметры where
     * @param callback
     */
    this.queryWhere = function (tableName, where, callback) {
        var query = "", value;
        query += "SELECT * FROM " + tableName + " WHERE 1=1 ";
        for (var name in where) {
            value = MYSQL.escape(where[name]);
            if (typeof where[name] == 'object' && where[name].constructor.name == 'Array') {
                query += " AND " + name + " IN(" + value + ")";
            } else {
                query += " AND " + name + " = " + value;
            }
        }
        DB.query(query, callback);
    };
    /**
     * Выполняет вставку в БД.
     * @param tableName {string} имя таблицы.
     * @param values {object} значения
     * @param callback
     */
    this.insert = function (tableName, values, callback) {
        var query, value, fieldsSQL, valuesSQL;
        query = fieldsSQL = valuesSQL = '';
        query += "INSERT INTO " + tableName;
        for (var name in values) {
            value = MYSQL.escape(values[name]);
            fieldsSQL += "`" + name + "`,";
            valuesSQL += value + ",";
        }
        query += "( " + fieldsSQL.substr(0, fieldsSQL.length - 1) + ")";
        query += "VALUES (" + valuesSQL.substr(0, valuesSQL.length - 1) + ")";
        DB.query(query, callback);
    }
};

/**
 * Статичный класс.
 * @type {DB}
 */
DB = new DB();
DB.init();