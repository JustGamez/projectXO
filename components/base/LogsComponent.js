LogsComponent = function () {

    this.inLog = function (message) {
        console.log(message);
    };

    this.switchOn = function () {

    };

    this.switchOff = function () {

    };
};

LogsComponent.TestComponent = function () {
    var self = this;

    this.outLog = null;

    var test = function () {
        var capthMessage, tmp;
        // mock console.log function
        tmp = console.log;
        console.log = function (message) {
            capthMessage = message;
        };

        // do some actions
        self.outLog("Some messages");

        // do some asserts
        ASSERT.equal(capthMessage, "Some messages");

        // mock-back console.log function
        console.log = tmp;
    };

    this.switchOn = function () {
        test();
    };

    this.switchOff = function () {

    };
};

LogsComponent.TestBoardScheme = [
    {
        name: 'test',
        component: 'TestComponent',
        soldering: {
            'outLog': 'Logs.inLog'
        },
        setup: {}
    },
    {
        name: 'Logs',
        component: 'LogsComponent',
        soldering: {},
        setup: {}
    }
];