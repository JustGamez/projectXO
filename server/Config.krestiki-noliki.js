/**
 * Файл конфигурации.
 * @type {Object}
 */
Config = {
    Logs: {
        triggerLevel: 1 // detail, see Logs.LEVEL_*
    },
    DB: {
        host: 'localhost',
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
    },
    Adv_Disabled: {
        id: '56307',
        hash: 'c1646e2bb80df9d5ce5a03826e829156'
    },
    DataGame: {
        cacheFinishedGameTimeout: 30 * 60 * 1000 // сливать в бд игры, через пол часа.
    },
    Project: {
        urlPrefix: '/xo',
        applicationAreaHeight: 685
    },
    VKCommentWidget: {
        // 125 - is it Adv
        height: 570 + 125,
        width: 788
    }
};