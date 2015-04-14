Config = {
    Invites: {
        /* Столько будет держаться надпись: "Ждём..." при приглашении. */
        inviteTimeout: 1000 * (320),
        /* Столько будет держаться надпись: "Играем?" при приглашении. */
        letsPlaytimeout: 1000 * (320 - 2)
    },
    Logs: {
        triggerLevel: Logs.LEVEL_DETAIL
    },
    WebSocketClient: {
        host: 'ssl.krestiki-noliki',
        url: '/xo'
    },
    ElementCardInfo: {
        hideTimeout: 475
    },
    admin: {
        ids: [1, 2, 14]
    },
    Project: {
        urlPrefix: '/xo'
    },
    SocNet: {
        appId: 4467180
    }
};
