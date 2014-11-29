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
    }
];
