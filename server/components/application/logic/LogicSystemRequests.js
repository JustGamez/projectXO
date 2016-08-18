LogicSystemRequests = function () {

    this.getStatus = function (callback) {
        callback(
            '<pre>' + Profiler.getTextReport() + '</pre>' +
            "<script>setTimeout(function(){window.location.href = window.location.href;},1000);</script>"
        );
    };

    this.getStatistic = function (callback) {
        Statistic.flushCache();
        Statistic.getStatus(callback);
    };

    this.shutdown = function (callback) {
        callback('<pre>' + "Shutdown executed!" + new Date().getTime() + '</pre>');
        deInitBeforeShutdown(function () {
            process.exit();
        });
    };

    this.runNotifier = function (callback) {
        LogicNotifier.runManual();
        callback('' + "executed notifiery: " + time());
    };

    this.logsSetDetail = function (callback) {
        Logs.setLevel(Logs.LEVEL_DETAIL);
        setTimeout(function () {
            Logs.setLevel(Logs.LEVEL_NOTIFY);
        }, 1000 * 60 * 10);
        callback("set detail log level " + new Date().getTime());
    };

    this.logsSetNotify = function (callback) {
        Logs.setLevel(Logs.LEVEL_NOTIFY);
        callback("set detail log level " + new Date().getTime());
    };
};

LogicSystemRequests = new LogicSystemRequests;