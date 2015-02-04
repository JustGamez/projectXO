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
            rps = Math.round((row.count / (row.sumTime / 1000)) * 100) / 100;
            output += rps;
            output += "\r\n";
        }
        console.log(output);
    };
};

/**
 * Статичный класс.
 * @type {Profiler}
 */
Profiler = new Profiler();