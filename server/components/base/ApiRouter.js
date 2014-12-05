/**
 * ApiRouter
 * Клиент-серверный компонент!
 * @constructor
 */
ApiRouter = function () {
    var self = this;

    var map = null;

    var connections = {};

    this.setup = function (setup) {
        if (setup.map) map = setup.map;
    };

    this.onData = function (packet, id) {
        var group, method, args;
        try {
            packet = JSON.parse(packet);
        } catch (e) {
            Logs.log("Wrong data:parse error", Logs.LEVEL_WARNING, packet);
            return;
        }
        if (typeof packet != 'object') {
            Logs.log("Wrong data: packet must be 'object'", Logs.LEVEL_WARNING, packet);
            return;
        }
        if (packet.group == undefined) {
            Logs.log("Wrong data: packet must have .group", Logs.LEVEL_WARNING, packet);
            return;
        }
        if (typeof packet.group != 'string') {
            Logs.log("Wrong data: packet.group must have type 'string'", Logs.LEVEL_WARNING, packet);
            return;
        }
        if (packet.method == undefined) {
            Logs.log("Wrong data: packet must have .method", Logs.LEVEL_WARNING, packet);
            return;
        }
        if (typeof packet.method != 'string') {
            Logs.log("Wrong data: packet.method must have type 'string'", Logs.LEVEL_WARNING, packet);
            return;
        }
        if (packet.args == undefined) {
            Logs.log("Wrong data: packet must have .args", Logs.LEVEL_WARNING, packet);
            return;
        }
        if (typeof packet.args != 'object') {
            Logs.log("Wrong data: packet.args must have type 'object'", Logs.LEVEL_WARNING, packet);
            return;
        }

        group = packet.group;
        method = packet.method;
        args = packet.args;

        if (map[group] == undefined) {
            Logs.log("Wrong data: group not found " + group, Logs.LEVEL_WARNING, packet);
            return;
        }
        if (map[group][method] == undefined) {
            Logs.log("Wrong data: method not found " + method, Logs.LEVEL_WARNING, packet);
            return;
        }
        // добавим к аргументам контекст соединения.
        args.unshift(connections[id]);
        // выполним запрашиваемый метод.
        map[group][method].apply(self, args);
    };

    this.onConnect = function (id) {
        Logs.log("connection created: id=" + id, Logs.LEVEL_DETAIL)
        connections[id] = {
            connectionId: id
        };
    };

    this.onDisconnect = function (id) {
        Logs.log("connection close: id=" + id, Logs.LEVEL_DETAIL)
        delete connections[id];
    };

    this.executeRequest = function (group, method, args, cntxList) {
        var packet = {
            group: group,
            method: method,
            args: Array.prototype.slice.call(args)
        };
        packet = JSON.stringify(packet);
        for (var i in cntxList) {
            this.sendData(packet, cntxList[i].connectionId);
        }
    };
};