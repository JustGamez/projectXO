/**
 * Файл конфигурации.
 * @type {Object}
 */
Config = {
    Logs: {
        triggerLevel: 1 // detail, see Logs.LEVEL_*
    },
    DB: {
        host: '192.168.100.2',
        username: 'root',
        password: 'root',
        database: 'xo',
        charset: 'UTF8'
    },
    SocNet: {
        secretKey: 'X0x2PuCZQbC5wwX0lB5R',
        appId: 4467180,
        refreshInfoTimeout: 60 * 30 * 24 // in seconds, 24 hour
    },
    Chat: {
        /**
         * Размер кэша, после заполнения, будет сливаться в БД.
         */
        cacheSize: 1000,
        /**
         * Кол-во сообщений, считающихся последними.
         */
        lastMessagesCount: 6,
        /**
         * Максимальная длина сообщения в чате.
         */
        messageLengthLimit: 128
    },
    Rating: {
        TopLimitSize: 10
    },
    ApiRouterMetric: {
        reportTimeout: 1000 * 60 * 60 * 6 // six hours
    },
    Profiler: {
        reportTimeout: 1000 * 60 * 60 * 6, // six hours
        saveToDBTimeout: 1000 * 60 * 10 // ten minutes
    },
    UrlCache: {
        lifeTime: 1000 * 60 * 30
    },
    WebSocketServer: {
        reloadClientCodeEveryRequest: true,
        compressJSClientCode: false,
        port: 3000,
        clientCodePath: '../client/',
        imagesPath: '../images/'
    },
    Statistic: {
        checkInterval: 1000,
        cacheLimit: 1000
    },
    admin: {
        ids: [1, 2, 14]
    }
};