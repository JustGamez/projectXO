Profiler = function () {
    var self = this;

    var data = {};
    var lastId = 0;
    var maxTitleLength = 0;

    this.start = function (id) {
        data[id].lastStart.push(new Date().getTime());
        data[id].deep++;
    };

    this.stop = function (id) {
        data[id].deep--;
        data[id].sumTime += new Date().getTime() - data[id].lastStart.pop();
        data[id].count++;
    };

    this.getNewId = function (title) {
        var newId;
        if (!title) {
            title = '';
        }
        newId = ++lastId;
        data[newId] = {
            lastStart: [],
            deep: 0,
            sumTime: 0,
            count: 0,
            title: title
        };
        if (title.length > maxTitleLength) {
            maxTitleLength = title.length;
        }
        return newId;
    };

    this.printReport = function () {
        output = self.getTextReport();
        console.log(output);
    };

    this.saveToDB = function () {
        var row, query, dateTime;
        query = "INSERT INTO profiling ( `datetime`, `profileId`, `sumTime`, `count` ) VALUES ";
        dateTime = Math.round(new Date().getTime() / 1000);
        for (var id in data) {
            row = data[id];
            query += "(" + dateTime + "," + id + "," + row.sumTime + "," + row.count + "),";
        }
        query = query.substr(0, query.length - 1);
        DB.query(query, function () {
        });
    };

    this.getTextReport = function () {
        var output, row, rps;
        output = '';
        output += "id " + str_pad("title", maxTitleLength + 3) + "  sumTime    count   rps\r\n";
        for (var id in data) {
            row = data[id];
            output += str_pad(id.toString(), 3);
            output += ' ';
            output += str_pad(row.title, maxTitleLength + 3);
            output += ' ';
            output += str_pad((row.sumTime / 1000).toString(), 10);
            output += ' ';
            output += str_pad((row.count).toString(), 7);
            output += ' ';
            rps = Math.round((row.count / (row.sumTime / 1000)) * 10000) / 10000;
            output += rps;
            output += "\r\n";
        }
        var memoryUsage = process.memoryUsage();
        output += "rss: " + Math.round(memoryUsage.rss / 1024 / 1024) + " Mb\r\n";
        output += "heapTotal: " + Math.round(memoryUsage.heapTotal / 1024 / 1024) + " Mb\r\n";
        output += "heapUsed: " + Math.round(memoryUsage.heapUsed / 1024 / 1024) + " Mb\r\n";
        return output;
    };

    this.init = function (afterInitCallback) {
        require(ROOT_DIR + 'profilerIds.js');
        afterInitCallback();
    };
};

/**
 * Статичный класс.
 * @type {Profiler}
 */
Profiler = new Profiler();