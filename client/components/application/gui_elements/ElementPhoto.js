/**
 * Элемент фотография.
 * @constructor
 * Инициирующие параметры:
 * x : number координта X
 * y : number координта Y
 */
ElementPhoto = function () {
    var self = this;

    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X.
     * @type {number}
     */
    this.x = 0;

    /**
     * Координата Y.
     * @type {number}
     */
    this.y = 0;

    /**
     * Ссылка на картинку фотографии.
     * @type {string}
     */
    var src = '/path/to/image.png';

    /**
     * Загрушка, на случай, если фотографии нет.
     * @type {string}
     */
    var srcDummy = '/images/photo/camera_c.gif';

    /**
     * Текст появляется при наведении мышки.
     * @type {string}
     */
    var title = '';

    /**
     * Кэллбэк при нажатии левой кнопки мыши.
     * @type {Function}
     */
    var onClick = null;

    this.showCardInfo = false;

    this.cardInfoOffsetX = 0;
    this.cardInfoOffsetY = 0;

    /**
     * Дом фотографии.
     * @type {GUIDom}
     */
    var domPhoto = null;

    /**
     * Дом рамки.
     * @type {GUIDom}
     */
    var domFrame = null;

    /**
     * Дом бордюр.
     * @type {GUIDom}
     */
    var domBorder = null;

    /**
     * Дом границ фоторгафии.
     * @type {GUIDom}
     */
    var domRegion = null;

    /**
     * Ширина бордюра рамки.
     * @type {number}
     */
    var borderWidth = 1;

    /**
     * Ширина рамки
     * @type {number}
     */
    this.frameWidth = 6;

    /**
     * Диапазон поворота фотографии.
     * @type {number}
     */
    this.degreesDiapazon = 12;

    /**
     * Угол поворота фотографии, расчитывается во время перерисовки.
     * @type {number}
     */
    var degress = 0;

    /**
     * Ширина фотографии.
     * Стандартная 50 на 50 фотография.
     * @type {number}
     */
    this.photoWidth = 50;

    /**
     * Высота фотографии.
     * Стандартная 50 на 50 фотография.
     * @type {number}
     */
    this.photoHeight = 50;

    /**
     * Ширина области активности вокруг фотографии.
     * @type {number}
     */
    var regionWidth = 80;

    /**
     * Высота области активности вокруг фотографии.
     * @type {number}
     */
    var regionHeight = 105;

    /**
     * Далее идут переменные кнопки пригласить\играём? и индикатора ждём...
     */

    /**
     * Кнопка пригласить в игру.
     * @type {ElementButton}
     */
    var buttonInvite = null;
    /**

     * Кнопка просмотра игры.
     * @type {ElementButton}
     */
    var buttonLookGame = null;

    /**
     * Калбэк при нажатии кнопки пригласить в игру.
     * @type {Function}
     */
    var onButtonInviteClick = null;

    /**
     * Калбэк при нажатии кнопки "в игре..."
     * @type {Function}
     */
    var onButtonLookGameClick = null;

    /**
     * Кнопка "Играём?".
     * @type {ElementButton}
     */
    var buttonLetsPlay = null;

    /**
     * Калбэк при нажатии кнопки "Играём?".
     * @type {ElementButton}
     */
    var onButtonLetsPlayClick = null;

    /**
     * Индикатор "ждём...".
     * @type {null}
     */
    var domIndicatorWaiting = null;

    var showState = false;

    /**
     * Текст: "занят".
     * @type {GUIDom}
     */
    var elementBusyText = false;

    /**
     * Текст "оффлайн".
     * @type {GUIDom}
     */
    var elementOfflineText = false;

    /**
     * Указатель мыши при наведении.
     * @type {string}
     */
    this.pointer = GUI.POINTER_HAND;

    /**
     * Элемент: кард-инфо.
     * @type {ElementCardInfo}
     */
    var elementCardInfo;

    /** @type {GUIDom} */
    var domInviteSign;

    /** @type {GUIDom} */
    var domInviteFieldType;

    /**
     * юзер-дата, нужно для: кард-инфо, ...
     * @type {Object}
     */
    var user = null;

    /**
     * Создадим домы и настроем их.
     */
    this.init = function () {
        /* @todo do user is self.user */
        if (self.user) {
            user = self.user;
        }
        /* Границы фотографии */
        domRegion = GUI.createDom();
        domRegion.width = regionWidth;
        domRegion.height = regionHeight;
        /* Бордюр рамки фотографии */
        domBorder = GUI.createDom(domRegion);
        domBorder.x = 8;
        domBorder.y = 5;
        domBorder.border = borderWidth + 'px solid #ebb';
        domBorder.width = self.frameWidth * 2 + self.photoWidth;
        domBorder.height = self.frameWidth * 2 + self.photoHeight;
        domBorder.pointer = self.pointer;
        /* Рамка фотографии */
        domFrame = GUI.createDom(domBorder);
        domFrame.border = self.frameWidth + 'px solid #eee';
        domFrame.x = 0;
        domFrame.y = 0;
        domFrame.width = self.photoWidth;
        domFrame.height = self.photoHeight;
        /* Фотография */
        domPhoto = GUI.createDom(domFrame);
        domPhoto.x = 0;
        domPhoto.y = 0;
        domPhoto.height = self.photoHeight;
        domPhoto.width = self.photoWidth;
        domPhoto.backgroundSize = self.photoWidth;
        domPhoto.isItsepia = true;
        /* Кнопка приглашения в игру */
        buttonInvite = GUI.createElement("ElementButton", {
            x: 0,
            y: 77,
            srcRest: '/images/photo/buttonInviteRest.png',
            srcHover: '/images/photo/buttonInviteHover.png',
            srcActive: '/images/photo/buttonInviteActive.png',
            title: 'Пригласить в игру.',
            onClick: function (mouseEvent, dom) {
                onButtonInviteClick.call(null, user);
            }
        }, domRegion);
        /* Кнопка "Играём?" */
        buttonLetsPlay = GUI.createElement("ElementButton", {
            x: -2,
            y: 65,
            srcRest: '/images/photo/buttonLetsPlayRest.png',
            srcHover: '/images/photo/buttonLetsPlayHover.png',
            srcActive: '/images/photo/buttonLetsPlayActive.png',
            title: 'Принять приглашение.',
            onClick: function (mouseEvent, dom) {
                onButtonLetsPlayClick.call(null, user);
            }
        }, domRegion);
        /* Кнопка "играет <o>" */
        buttonLookGame = GUI.createElement("ElementButton", {
            x: 7,
            y: 74,
            srcRest: '/images/photo/buttonInGame.png',
            srcHover: '/images/photo/buttonInGame.png',
            srcActive: '/images/photo/buttonInGame.png',
            title: 'Посмотреть игру.',
            onClick: function (mouseEvent, dom) {
                onButtonLookGameClick.call(null, user);
            }
        }, domRegion);
        /* Индикатор "Ждём..." */
        domIndicatorWaiting = GUI.createDom(domRegion);
        domIndicatorWaiting.x = 3;
        domIndicatorWaiting.y = 64;
        domIndicatorWaiting.width = 90;
        domIndicatorWaiting.height = 41;
        domIndicatorWaiting.backgroundImage = '/images/photo/indicatorWait.png';
        domIndicatorWaiting.title = 'Ожидание оппонента.';
        /* Текст оффлайн. */
        elementOfflineText = GUI.createDom(domRegion);
        elementOfflineText.x = 8;
        elementOfflineText.y = 73;
        elementOfflineText.width = 62;
        elementOfflineText.height = 15;
        elementOfflineText.backgroundImage = '/images/photo/textOffline.png';
        elementOfflineText.opacity = 0.21;
        /* Текст занят. */
        elementBusyText = GUI.createDom(domRegion);
        elementBusyText.x = 15;
        elementBusyText.y = 72;
        elementBusyText.width = 49;
        elementBusyText.height = 14;
        elementBusyText.backgroundImage = '/images/photo/textBusy.png';
        elementBusyText.opacity = 0.37;
        /* Обозначения приглашений. */
        domInviteFieldType = GUI.createDom(domRegion, {x: 25, y: 93});
        domInviteSign = GUI.createDom(domRegion, {x: 40, y: 93});
        /* Кард-инфо. */
        elementCardInfo = GUI.createElement("ElementCardInfo", {});
        GUI.bind(domPhoto, GUI.EVENT_MOUSE_CLICK, onClickPhoto, this);
        GUI.bind(domPhoto, GUI.EVENT_MOUSE_OVER, onMouseOver, this);
        GUI.bind(domPhoto, GUI.EVENT_MOUSE_OUT, onMouseOut, this);
    };

    /**
     * Покажем домы.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        domRegion.show();
        domBorder.show();
        domFrame.show();
        domPhoto.show();
        self.redraw();
        /**
         *  Элементы:
         *  domIndicatorWaiting, buttonInvite, buttonLetsPlay
         *  показываются в функции redraw(), т.к. их отобржение не безусловно.
         */
    };

    /**
     * Спрячем домы.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        domRegion.hide();
        domBorder.hide();
        domFrame.hide();
        domPhoto.hide();
        domIndicatorWaiting.hide();
        buttonInvite.hide();
        buttonLetsPlay.hide();
        elementCardInfo.hide();
    };

    /**
     * Перерисуем фотографию.
     */
    this.redraw = function () {
        var currentUser;
        if (!showed) return;
        degress = getRealRandom(src);
        currentUser = LogicUser.getCurrentUser();
        /* Если, нет фотографии, то отображаем заглушку */
        if (user) {
            title = user.firstName + " " + user.lastName;
        } else {
            title = '';
        }
        if (user && user.photo50) {
            src = user.photo50;
        } else {
            src = srcDummy;
        }
        domRegion.x = self.x;
        domRegion.y = self.y;
        domRegion.transform = 'rotate(' + degress + 'deg)';
        domBorder.title = title;
        domPhoto.backgroundImage = src;
        elementCardInfo.x = self.x + self.cardInfoOffsetX;
        elementCardInfo.y = self.y + self.cardInfoOffsetY;
        domRegion.redraw();
        domPhoto.redraw();
        domBorder.redraw();
        domFrame.redraw();
        elementCardInfo.redraw();

        var state;
        if (showState) {
            state = ElementPhoto.STATE_ONLINE;
            if (LogicInvites.isInviteExists(currentUser.id, user.id)) {
                state = ElementPhoto.STATE_WAIT;
            }
            if (LogicInvites.isInviteExists(user.id, currentUser.id)) {
                state = ElementPhoto.STATE_LETS_PLAY;
            }
            if (user.isBusy) {
                state = ElementPhoto.STATE_BUSY;
            }
            if (user.onGameId) {
                state = ElementPhoto.STATE_PLAY;
            }
            if (!user.online) {
                state = ElementPhoto.STATE_OFFLINE;
            }
        } else {
            state = ElementPhoto.STATE_HIDEN;
        }
        /* redraw indicatoraz */
        // @todo just change src
        /* @todo button invite if online and not in robot game! that all!*/
        if (state == ElementPhoto.STATE_ONLINE) {
            buttonInvite.show();
        } else {
            buttonInvite.hide();
        }
        if (state == ElementPhoto.STATE_PLAY) {
            buttonLookGame.show();
        } else {
            buttonLookGame.hide();
        }
        if (state == ElementPhoto.STATE_BUSY) {
            elementBusyText.show();
        } else {
            elementBusyText.hide();
        }
        if (state == ElementPhoto.STATE_WAIT) {
            domIndicatorWaiting.show();
        } else {
            domIndicatorWaiting.hide();
        }
        if (state == ElementPhoto.STATE_LETS_PLAY) {
            var invite = LogicInvites.get(user.id, currentUser.id);
            if (invite.fieldTypeId == LogicXO.FIELD_TYPE_3X3)domInviteFieldType.backgroundImage = '/images/photo/inviteField3x3.png';
            if (invite.fieldTypeId == LogicXO.FIELD_TYPE_15X15)domInviteFieldType.backgroundImage = '/images/photo/inviteField15x15.png';
            var signs = LogicXO.whoIsX(invite.signId, LogicXOSettings.requestedSignId, user.id, currentUser.id);
            if (signs.XUserId == currentUser.id) {
                domInviteSign.backgroundImage = '/images/photo/inviteSignX.png';
            } else {
                domInviteSign.backgroundImage = '/images/photo/inviteSignO.png';
            }
            domInviteFieldType.redraw();
            domInviteSign.redraw();
            buttonLetsPlay.show();
            domInviteFieldType.show();
            domInviteSign.show();
        } else {
            buttonLetsPlay.hide();
            domInviteSign.hide();
            domInviteFieldType.hide();
        }
        if (state == ElementPhoto.STATE_OFFLINE) {
            elementOfflineText.show();
        } else {
            elementOfflineText.hide();
        }
    };

    /**
     * Обновление данных фотографии.
     * @param params { {
     *       src: string,
     *       onButtonInviteClick: Function,
     *       onButtonLetsPlayClick: Function,
     *   }}
     */
    this.update = function (params) {
        user = params.user;
        onButtonInviteClick = params.onButtonInviteClick;
        onButtonLetsPlayClick = params.onButtonLetsPlayClick;
        onButtonLookGameClick = params.onButtonLookGameClick;
        showState = params.showState;
    };

    /**
     * Случайное условно-постоянное число на основе строки.
     * @returns {number}
     */
    var getRealRandom = function (string) {
        /* random rotate photo */
        /* super real-random */
        /* считаем сумму всех кодов знаков из строки, умноженных на позицию знака(*256) */
        var deg, number, date, superPosition;
        superPosition = 360;
        number = 0;
        for (var i in string) {
            number += string.charCodeAt(i) * ((i * 256) + 1);
        }
        date = new Date;
        number += date.getDay(); //TODO switch to getTime()
        /* super real-random */
        deg = (number % ( superPosition + 1)) - (( superPosition + 1) / 2);
        deg = deg / superPosition * self.degreesDiapazon;
        return deg;
    };

    /**
     * Посредник кэллбэка, т.к. кэллбак присваивается один раз.
     * И в процессе может меняться.
     */
    var onClickPhoto = function () {
        if (user.socNetUserId) {
            window.open(SocNet.getUserProfileUrl(user.socNetTypeId, user.socNetUserId), '_blank');
        }
    };

    /**
     * При наведении мыши, покажем кард инфо.
     */
    var onMouseOver = function () {
        if (!self.showCardInfo) {
            return false;
        }
        elementCardInfo.updateUser(user);
        elementCardInfo.show();
    };

    /**
     * При уходе фокуса мыши, прячем кард инфо.
     */
    var onMouseOut = function () {
        if (!self.showCardInfo) {
            return false;
        }
        elementCardInfo.hideStart();
    };

    this.raiseMouseOver = function () {
        onMouseOver();
    };

    this.raiseMouseOut = function () {
        onMouseOut();
    };
};

/* Пользователь поидеи находиться в одном из состояний. */
ElementPhoto.STATE_ONLINE = 1;
ElementPhoto.STATE_PLAY = 2;
ElementPhoto.STATE_BUSY = 3;
ElementPhoto.STATE_WAIT = 4;
ElementPhoto.STATE_LETS_PLAY = 5;
ElementPhoto.STATE_OFFLINE = 6;
ElementPhoto.STATE_HIDEN = 7;
