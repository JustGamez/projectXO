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
        port: 80,
        protocol: 'ws'
    },
    ElementCardInfo:{
        hideTimeout: 475
    }
};
