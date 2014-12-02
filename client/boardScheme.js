BoardScheme = [
    {
        name: 'Logs',
        component: 'LogsComponent',
        soldering: {},
        setup: {}
    },
    {
        name: 'Connector',
        component: 'WebSocketClient',
        soldering: {
            'outLog': 'Logs.inLog',
            'outData': 'Port.inData'
        },
        setup: {
            host: 'localhost',
            port: 80,
            trySendTimeout: 10
        }
    },
    {
        name: 'Port',
        component: 'PortComponent',
        configure: {
            pins: [
                'inAuthorizationByVK',
                'inPing',
                'outPong'
            ]
        },
        setup: {},
        soldering: {
            'outData': 'Connector.inData',
            'outLog': 'Logs.inLog',
            'outPong': 'SAPIUser.inPong'
        }
    },
    {
        name: 'SAPIUser',
        component: 'SAPIUserComponent',
        setup: {},
        soldering: {
            'outAuthorizationByVK': 'Port.inAuthorizationByVK',
            'outPing': 'Port.inPing'
        }
    }
];
