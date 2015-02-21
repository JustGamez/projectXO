ApiRouterMetrics = {};

ApiRouterMetrics.map = {};
ApiRouterMetrics.timeBegin = null;

ApiRouterMetrics.getMetrics = function () {
    var output, timeNow, timeElapsed, count, rps, countSumm;
    timeNow = new Date().getTime();
    timeElapsed = (timeNow - ApiRouterMetrics.timeBegin) / 1000;
    output = '';
    output += "___________________\r\n";
    output += "elapsed: " + timeElapsed + " sec.\r\n";
    countSumm = 0;
    for (var group in ApiRouterMetrics.map) {
        output += "" + group + "\r\n";
        for (var method in ApiRouterMetrics.map[group]) {
            count = ApiRouterMetrics[group][method];
            if (!count)continue;
            rps = Math.round((count / timeElapsed) * 100) / 100;
            method = str_pad(method, 30);
            output += "    " + method + ' : ' + count + "  " + rps + " rps." + "\r\n";
            countSumm += count;
        }
    }
    rps = Math.round((countSumm / timeElapsed) * 100) / 100;
    output += "summary: " + countSumm + "   " + rps + " rps.\r\n";
    return output;
};

ApiRouterMetrics.printMetrics = function () {
    var output;
    output = ApiRouterMetrics.getMetrics();
    console.log(output);
};

ApiRouterMetrics.setup = function (map) {
    ApiRouterMetrics.timeBegin = new Date().getTime();
    ApiRouterMetrics.map = {};
    var apiName, apiEnabled, APIObject;
    for (var i in map) {
        apiName = i;
        apiEnabled = map[i];
        if (!apiEnabled) {
            continue;
        }
        ApiRouterMetrics[apiName] = {};
        ApiRouterMetrics.map[apiName] = {};
        APIObject = GLOBAL[apiName];
        for (var propName in APIObject) {
            if (typeof APIObject[propName] == 'function') {
                ApiRouterMetrics[apiName][propName] = 0;
                ApiRouterMetrics.map[apiName][propName] = true;
            }
        }
    }
};