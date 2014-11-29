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
            'outLog': 'Logs.inLog'
        },
        setup: {
            host: 'localhost',
            port: 80,
            trySendTimeout: 10
        }
    }
];
