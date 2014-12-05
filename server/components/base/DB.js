/**
 * Компонент для работы с базой данных.
 */

/**
 * Подключаем nodeJS модули.
 */
var MYSQL = require('mysql');

DB = function () {
    var self = this;

    var connection = null;
    var isConnected = false;

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

    this.query = function (query, callback) {
        connection.query(query, function (err, rows) {
            if (err) {
                Logs.log("Query error:", Logs.LEVEL_FATAL_ERROR, err);
            }
            callback(rows);
        });
    };

    this.queryWhere = function (tableName, where, callback) {
        var query = "", value;
        query += "SELECT * FROM " + tableName + " WHERE 1=1 ";
        for (var name in where) {
            value = MYSQL.escape(where[name]);
            query += " AND " + name + " = " + value;
        }
        DB.query(query, callback);
    };

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