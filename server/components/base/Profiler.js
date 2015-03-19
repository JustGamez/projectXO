Profiler = function () {
    var self = this;

    var data = {};
    var lastId = 0;
    var maxTitleLength = 0;

    /**  Last profiler Id. */
    var lastPrid = 0;

    this.start = function (id) {
        lastPrid++;
        data[id].stamps[lastPrid] = mtime();
        return lastPrid;
    };

    this.stop = function (id, prid) {
        if (!prid) {
            Logs.log("Profiler.stop().", Logs.LEVEL_WARNING, prid);
        }
        if (!data[id].stamps[prid]) {
            Logs.log("Profiler.stop(). no stamp for", Logs.LEVEL_WARNING, {prid: prid, id: id});
        }
        data[id].sumTime += mtime() - data[id].stamps[prid];
        data[id].count++;
        delete data[id].stamps[prid];
    };

    this.getNewId = function (title) {
        var newId;
        if (!title) {
            title = '';
        }
        newId = ++lastId;
        data[newId] = {
            stamps: {},
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
        var row, query;
        query = "INSERT INTO profiling ( `datetime`, `profileId`, `sumTime`, `count` ) VALUES ";
        for (var id in data) {
            row = data[id];
            query += "(" + time() + "," + id + "," + row.sumTime + "," + row.count + "),";
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
            rps = (row.count / (row.sumTime / 1000) * 10000) / 10000;
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
