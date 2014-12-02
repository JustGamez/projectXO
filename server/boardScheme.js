BoardScheme = [
    {
        name: 'Logs',
        component: 'LogsComponent',
        soldering: {},
        setup: {}
    },
    {
        name: 'DB',
        component: 'DBComponent',
        soldering: {
            'outLog': 'Logs.inLog'
        },
        setup: {
            host: 'localhost',
            username: 'root',
            password: '',
            database: 'xo',
            charset: 'UTF8'
        }
    },
    {
        name: 'Connector',
        component: 'WebSocketServer',
        setup: {
            port: 80,
            reloadClientCodeEveryRequest: true,
            clientCodePath: '../client/'
        },
        soldering: {
            'outLog': 'Logs.inLog',
            'outData': 'Port.inData'
        }
    },
    {
        name: 'Port',
        component: 'PortComponent',
        configure: {
            pins: [
                'outAuthorizationByVK',
                'outPing',
                'inPong'
            ]
        },
        setup: {},
        soldering: {
            'outLog': 'Logs.inLog',
            'outData': 'Connector.inData',
            'outAuthorizationByVK': 'SAPIUser.inAuthorizationByVK',
            'outPing': 'SAPIUser.inPing'
        }
    },
    {
        name: 'SAPIUser',
        component: 'SAPIUserComponent',
        soldering: {
            'outPong': 'Port.inPong'
        },
        setup: {}
    }
];
