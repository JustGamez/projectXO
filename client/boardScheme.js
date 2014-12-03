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
                'inUserAuthorizationByVK',
                'outUserAuthorizationSuccess'
            ]
        },
        setup: {},
        soldering: {
            'outData': 'Connector.inData',
            'outLog': 'Logs.inLog',
            'outUserAuthorizationSuccess': 'LogicUser.inUserAuthorizationSuccess'
        }
    },
    {
        name: 'SocNet',
        component: 'SocNetComponent',
        setup: {},
        soldering: {
            'outLog': 'Logs.inLog',
            'outData': 'LogicUser.inSocNetData'
        }
    },
    {
        name: 'LogicUser',
        component: 'LogicUserComponent',
        setup: {},
        soldering: {
            'outLog': 'Logs.inLog',
            'outUserAuthorizationByVK': 'Port.inUserAuthorizationByVK'
        }
    }
];
