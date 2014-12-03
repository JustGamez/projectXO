/**
 * Компонент порт
 * Клиент-серверный компонент!
 * @param configure { pins: ['inA', 'outB'] }
 * @constructor
 */
PortComponent = function (configure) {
    var self = this;
    var pins = configure.pins;
    for (var i in pins) {
        var pinName = pins[i];
        if (pinName.indexOf("in") != 0) {
            self[pinName] = null;
            continue;
        }
        self[pinName] = function () {
            sendOut(arguments.callee.pinName, arguments);
        };
        self[pinName].pinName = pinName;
    }

    var sendOut = function (pinName, args) {
        var portPacket = {
            pinName: pinName,
            args: Array.prototype.slice.call(args)
        };
        portPacket = JSON.stringify(portPacket);
        self.outData(portPacket);
    };

    this.inData = function (portPacket, id) {
        var pinName;
        try {
            portPacket = JSON.parse(portPacket);
        } catch (e) {
            self.outLog("Wrong data:parse error", LogsComponent.LEVEL_WARNING, portPacket);
            return;
        }
        if (typeof portPacket != 'object') {
            self.outLog("Wrong data: packet must be 'object'", LogsComponent.LEVEL_WARNING, portPacket);
            return;
        }
        if (portPacket.pinName == undefined) {
            self.outLog("Wrong data: packet must have .pinName", LogsComponent.LEVEL_WARNING, portPacket);
            return;
        }
        if (typeof portPacket.pinName != 'string') {
            self.outLog("Wrong data: packet.pinName must have type 'string'", LogsComponent.LEVEL_WARNING, portPacket);
            return;
        }
        if (portPacket.args == undefined) {
            self.outLog("Wrong data: packet must have .args", LogsComponent.LEVEL_WARNING, portPacket);
            return;
        }
        if (typeof portPacket.args != 'object') {
            self.outLog("Wrong data: packet.args must have type 'object'", LogsComponent.LEVEL_WARNING, portPacket);
            return;
        }

        pinName = portPacket.pinName;

        if (pinName.indexOf("in") != 0) {
            self.outLog("Wrong data: packet.pinName must begining by 'in', but given: " + pinName, LogsComponent.LEVEL_WARNING, portPacket);
            return;
        }

        pinName = "out" + pinName.substr(2);

        if (self[pinName] == undefined) {
            self.outLog("Wrong data: pin not found: " + pinName, LogsComponent.LEVEL_WARNING, portPacket);
            return;
        }
        self[pinName].apply(self, portPacket.args);
    };

    this.outData = null;
    this.outLog = null;
};

PortComponent.TestBoardScheme = [
    {
        name: 'test',
        component: 'TestComponent',
        setup: {},
        soldering: {
            'outData': 'Port.inData',
            'outPortA': 'Port.inA'
        }
    }, {
        name: 'Port',
        component: 'PortComponent',
        configure: {
            pins: [
                'inA',
                'outC'
            ]
        },
        setup: {},
        soldering: {
            'outLog': 'test.inLog',
            'outData': 'test.inData',
            'outC': 'test.inC'
        }
    }
];

PortComponent.TestComponent = function () {
    var self = this;

    this.outPortA = null;
    this.outData = null;

    var capthData;
    var capthLog;
    var capthInC_args;

    this.inData = function (data) {
        capthData = data;
    };

    this.inLog = function (message, level, detail) {
        capthLog = message;
    };

    this.inC = function (a, b, c) {
        capthInC_args = arguments;
    };

    this.switchOn = function () {
        // test data passed, and json stringify
        self.outPortA("data");
        ASSERT.equal(capthData, JSON.stringify({pinName: 'inA', args: ['data']}));
        // test wrong data
        self.outPortA("DATA");
        self.outData('');
        ASSERT.equal(capthLog, "Wrong data:parse error");

        // test wrong data, not object, but string
        self.outData(JSON.stringify('string'));
        ASSERT.equal(capthLog, "Wrong data: packet must be 'object'");

        // test wrong data, empty object
        self.outData(JSON.stringify({}));
        ASSERT.equal(capthLog, "Wrong data: packet must have .pinName");

        // test wrong data, object without .args
        self.outData(JSON.stringify({pinName: 'name'}));
        ASSERT.equal(capthLog, "Wrong data: packet must have .args");

        // test wrong data, object without wrong .pinName
        self.outData(JSON.stringify({pinName: {}, args: []}));
        ASSERT.equal(capthLog, "Wrong data: packet.pinName must have type 'string'");

        // test wrong data, object without wrong .args
        self.outData(JSON.stringify({pinName: 'name', args: 'wrong'}));
        ASSERT.equal(capthLog, "Wrong data: packet.args must have type 'object'");

        // test request unexistend input pin.
        self.outData(JSON.stringify({pinName: 'inB', args: []}));
        ASSERT.equal(capthLog, "Wrong data: pin not found: outB");

        // test request wrong direction
        self.outData(JSON.stringify({pinName: 'outB', args: []}));
        ASSERT.equal(capthLog, "Wrong data: packet.pinName must begining by 'in', but given: outB");

        // test execute success
        self.outPortA('arg1', 2, {'param': 5});
        capthData = capthData.replace('inA', 'inC')
        self.outData(capthData);
        ASSERT.equal(JSON.stringify([].slice.call(capthInC_args)), JSON.stringify(['arg1', 2, {'param': 5}]));
    };
};

