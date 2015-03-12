/**
 * Основная страница игры.
 * @constructor
 */
PageMain = function PageMain() {
    var self = this;

    /**
     * Показывать ли страницу.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    /**
     * Элемент списка друзей.
     * @type {ElementFriendsType}
     */
    this.elementFriendsType = null;

    /**
     * Создадим тут все элементы страницы.
     */
    this.init = function () {
        var element;
        /* Кнопка играть. */
        element = GUI.createElement('ElementButton', {
            x: 259,
            y: 225,
            title: 'Играть с роботом',
            srcRest: '/images/buttons/playRest.png',
            srcHover: '/images/buttons/playHover.png',
            srcActive: '/images/buttons/playActive.png',
            onClick: LogicPageMain.onPlayButtonClick
        });
        self.elements.push(element);
        /* Выбор типа поля игры */
        element = GUI.createElement("ElementRadio", {
            options: [
                {
                    srcRest: '/images/radio/field15x15Rest.png',
                    srcHover: '/images/radio/field15x15Hover.png',
                    srcActive: '/images/radio/field15x15Active.png',
                    x: 550,
                    y: 100,
                    width: 156,
                    height: 85,
                    title: 'поле 15 на 15, \r\nпобеждает линия \r\nиз 5-ти знаков.',
                    value: LogicXO.FIELD_TYPE_15X15
                },
                {
                    srcRest: '/images/radio/field3x3Rest.png',
                    srcHover: '/images/radio/field3x3Hover.png',
                    srcActive: '/images/radio/field3x3Active.png',
                    x: 558,
                    y: 159,
                    width: 123,
                    height: 86,
                    title: 'поле 3 на 3, \r\nпобеждает линия \r\nиз 3-ёх знаков.',
                    value: LogicXO.FIELD_TYPE_3X3
                }
            ],
            currentIndex: 0,
            onChange: LogicPageMain.onRadioFieldTypeChange
        });
        self.elements.push(element);
        /* Выбор знака игры */
        element = GUI.createElement("ElementRadio", {
            options: [
                {
                    srcRest: '/images/radio/signRandomRest.png',
                    srcHover: '/images/radio/signRandomHover.png',
                    srcActive: '/images/radio/signRandomActive.png',
                    x: 97,
                    y: 90,
                    width: 148,
                    height: 70,
                    title: 'Играть любым знаком.',
                    value: LogicXO.SIGN_ID_Empty
                },
                {
                    srcRest: '/images/radio/signXRest.png',
                    srcHover: '/images/radio/signXHover.png',
                    srcActive: '/images/radio/signXActive.png',
                    x: 212,
                    y: 80,
                    width: 146,
                    height: 102,
                    title: 'Играть крестиком.',
                    value: LogicXO.SIGN_ID_X
                },
                {
                    srcRest: '/images/radio/signORest.png',
                    srcHover: '/images/radio/signOHover.png',
                    srcActive: '/images/radio/signOActive.png',
                    x: 307,
                    y: 78,
                    width: 146,
                    height: 102,
                    title: 'Играть ноликом.',
                    value: LogicXO.SIGN_ID_O
                }
            ],
            currentIndex: 0,
            onChange: LogicPageMain.onRadioSignChange
        });
        self.elements.push(element);
        /* Лента друзей */
        element = GUI.createElement('ElementFriendsType', {
            x: 138,
            y: 357,
            spacing: 79,
            columns: 5,
            friends: [],
            onClickDummy: LogicPageMain.onAddFriendButtonClick
        });
        self.elements.push(element);
        self.elementFriendsType = element;
        /* Кнопка рейтинг. */
        element = GUI.createElement('ElementButton', {
            x: 560,
            y: 360,
            width: 140,
            height: 48,
            srcRest: '/images/buttons/ratingRest.png',
            srcHover: '/images/buttons/ratingHover.png',
            srcActive: '/images/buttons/ratingActive.png',
            onClick: LogicPageMain.onRatingButtonClick
        });
        self.elements.push(element);
        /* Кнопка, добавить друга. */
        element = GUI.createElement('ElementButton', {
            x: 70,
            y: 355,
            width: 75,
            height: 80,
            title: 'Пригласить друзей.',
            srcRest: '/images/buttons/addFriendRest.png',
            srcHover: '/images/buttons/addFriendHover.png',
            srcActive: '/images/buttons/addFriendActive.png',
            onClick: LogicPageMain.onAddFriendButtonClick
        });
        self.elements.push(element);
        /* Кнопка `(?)` */
        element = GUI.createElement('ElementButton', {
                x: 686,
                y: 64,
                width: 36,
                height: 37,
                srcRest: '/images/help/buttons/helpRest.png',
                srcHover: '/images/help/buttons/helpHover.png',
                srcActive: '/images/help/buttons/helpActive.png',
                onClick: LogicPageMain.onButtonHelpClick
            }
        );
        self.elements.push(element);
    };

    /**
     * Покажем все элементы на странице.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        for (var i in self.elements) {
            self.elements[i].show();
        }
        self.redraw();
    };

    /**
     * Спрачем все элементы на странице.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        for (var i in self.elements) {
            self.elements[i].hide();
        }
    };

    /**
     * Настройка перед отрисовкой.
     */
    this.preset = function () {
        var usersList, ids, friendIds, onlineIds, user, currentUser, showButtonInvite, showButtonLetsPlay, showIndicatorWaiting, enableButtonInvite, showBusyText, showOfflineText;
        usersList = [];
        ids = [];
        currentUser = LogicUser.getCurrentUser();
        if (currentUser.id) {
            ids = ids.concat(LogicFriends.getFriendsById(currentUser.id));
            ids = ids.concat(LogicUser.getOnlineUserIds());
        }
        /* remove duplicates */
        var tmp;
        tmp = [];
        for (var i in ids) {
            if (ids[i] == currentUser.id) {
                continue;
            }
            tmp[ids[i]] = ids[i];
        }
        ids = tmp;
        if (ids) {
            for (var i in ids) {
                user = LogicUser.getUserById(ids[i]);
                if (!user) {
                    continue;
                }
                /**
                 * установить случаи отображения:
                 * - инвайт да;
                 * - инвайт нет, если есть приглшание;
                 * - инвайт нет, если отправлено приглашение;
                 * - "играем?" нет;
                 * - "играем?" да, если есть приглашение;
                 * - "ждём..." нет;
                 * - "ждём..." да, если отправлено приглашение;
                 */
                /* шаг 1. Значения по умолчанию */
                enableButtonInvite = true;
                showButtonInvite = true;
                showButtonLetsPlay = false;
                showIndicatorWaiting = false;
                showBusyText = false;
                showOfflineText = false;
                /* шаг 2. Условия отключения кнопки приглашения. */
                if (LogicInvites.haveInvite(user.id) || !user.online || user.isBusy || user.onGameId) {
                    showButtonInvite = false;
                }
                /* шаг 3. Условия включения "играем?" */
                if (LogicInvites.isInviteExists(user.id, currentUser.id) && user.online) {
                    showButtonLetsPlay = true;
                }
                /* шаг 4. Условия включения "ждём..." */
                if (LogicInvites.isInviteExists(currentUser.id, user.id) && !showButtonLetsPlay && user.online && !user.isBusy && !user.onGameId) {
                    showIndicatorWaiting = true;
                }
                if (!user.online) {
                    showOfflineText = true;
                }
                if (user.online && (user.onGameId || user.isBusy)) {
                    showBusyText = true;
                }
                usersList.push({
                    isFriend: LogicFriends.isFriend(currentUser.id, user.id),
                    src: user.photo50,
                    title: user.firstName + " " + user.lastName,
                    online: user.online,
                    showButtonInvite: showButtonInvite,
                    enableButtonInvite: true,
                    showButtonLetsPlay: showButtonLetsPlay,
                    showIndicatorWaiting: showIndicatorWaiting,
                    showBusyText: showBusyText,
                    showOfflineText: showOfflineText,
                    onClick: function (photoInfo) {
                        window.open(SocNet.getUserProfileUrl(photoInfo.socNetTypeId, photoInfo.socNetUserId), '_blank');
                    },
                    onButtonInviteClick: LogicPageMain.onInviteClick,
                    onButtonLetsPlayClick: LogicPageMain.onLetsPlayClick,
                    userId: user.id,
                    user: user,
                    photoInfo: {id: user.id, socNetTypeId: user.socNetTypeId, socNetUserId: user.socNetUserId}
                });
            }
        }
        /** Сортировка.
         * Сортировтаь будем так:
         * - посл раз заходил.
         * - друг;
         * - онлайн;
         */
        usersList.sort(function (a, b) {
            if (a.user.lastLogoutTimestamp > b.user.lastLogoutTimestamp)return -1;
            if (a.user.lastLogoutTimestamp < b.user.lastLogoutTimestamp)return 1;
            return 0;
        });
        usersList.sort(function (a, b) {
            if (a.isFriend && !b.isFriend)return -1;
            if (!a.isFriend && b.isFriend)return 1;
            return 0;
        });
        usersList.sort(function (a, b) {
            if (a.online && !b.online)return -1;
            if (!a.online && b.online)return 1;
            return 0;
        });
        self.elementFriendsType.update(usersList);
    };

    /**
     * Обновляем онлайн индикатор и индикатор очков.
     */
    this.redraw = function () {
        if (!showed)return;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
