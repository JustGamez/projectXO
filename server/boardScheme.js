BoardScheme = [
    {
        name: 'Logs',
        component: 'LogsComponent',
        soldering: {},
        setup: {}
    },
    {
        name: 'Connector',
        component: 'WebSocketServer',
        soldering: {
            'outLog': 'Logs.inLog'
        },
        setup: {
            port: 80,
            reloadClientCodeEveryRequest: true,
            clientCodePath: '../client/'
        }
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
    }
];
