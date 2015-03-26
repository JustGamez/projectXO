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
    var regionHeight = 124;

    /**
     * Далее идут переменные кнопки пригласить\играём? и индикатора ждём...
     */

    /**
     * Кнопка пригласить в игру.
     * @type {ElementButton}
     */
    var stateElInvite = null;
    /**

     * Кнопка просмотра игры.
     * @type {ElementButton}
     */
    var stateElLookGame = null;

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
    var stateElLetsPlay = null;

    /**
     * Калбэк при нажатии кнопки "Играём?".
     * @type {ElementButton}
     */
    var onButtonLetsPlayClick = null;

    /**
     * Индикатор "ждём...".
     * @type {null}
     */
    var stateElWaiting = null;

    var showState = false;

    /**
     * Текст: "занят".
     * @type {GUIDom}
     */
    var stateElBusy = false;

    /**
     * Текст "оффлайн".
     * @type {GUIDom}
     */
    var stateElOffline = false;

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
    var stateElSignId;

    /** @type {GUIDom} */
    var stateElFieldType;

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
        stateElInvite = GUI.createElement("ElementButton", {
            x: 0,
            _y: 77,
            srcRest: '/images/photo/buttonInviteRest.png',
            srcHover: '/images/photo/buttonInviteHover.png',
            srcActive: '/images/photo/buttonInviteActive.png',
            title: 'Пригласить в игру.',
            onClick: function (mouseEvent, dom) {
                onButtonInviteClick.call(null, user);
            }
        }, domRegion);
        /* Кнопка "Играём?" */
        stateElLetsPlay = GUI.createElement("ElementButton", {
            x: -2,
            _y: 65,
            srcRest: '/images/photo/buttonLetsPlayRest.png',
            srcHover: '/images/photo/buttonLetsPlayHover.png',
            srcActive: '/images/photo/buttonLetsPlayActive.png',
            title: 'Принять приглашение.',
            onClick: function (mouseEvent, dom) {
                onButtonLetsPlayClick.call(null, user);
            }
        }, domRegion);
        /* Кнопка "играет <o>" */
        stateElLookGame = GUI.createElement("ElementButton", {
            x: 7,
            _y: 74,
            srcRest: '/images/photo/buttonInGame.png',
            srcHover: '/images/photo/buttonInGame.png',
            srcActive: '/images/photo/buttonInGame.png',
            title: 'Посмотреть игру.',
            onClick: function (mouseEvent, dom) {
                onButtonLookGameClick.call(null, user);
            }
        }, domRegion);
        /* Индикатор "Ждём..." */
        stateElWaiting = GUI.createDom(domRegion, {
            x: 3,
            _y: 64,
            backgroundImage: '/images/photo/indicatorWait.png',
            title: 'Отправлено приглашение.'
        });
        /* Текст оффлайн. */
        stateElOffline = GUI.createDom(domRegion, {
            x: 8,
            _y: 73,
            backgroundImage: '/images/photo/textOffline.png',
            opacity: 0.21
        });
        /* Текст занят. */
        stateElBusy = GUI.createDom(domRegion, {
            x: 15,
            _y: 72,
            backgroundImage: '/images/photo/textBusy.png',
            opacity: 0.37
        });
        /* Обозначения приглашений. */
        stateElFieldType = GUI.createDom(domRegion, {x: 22, y: 93});
        stateElSignId = GUI.createDom(domRegion, {x: 42, y: 93});
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
        stateElWaiting.hide();
        stateElInvite.hide();
        stateElLetsPlay.hide();
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

        /**
         * Ниже мы должны решить какие кнопки отображать из числа:
         * "оффлайн", "пригласить", "в игре...", "ждём...", "играем?"
         * stateElOffline, stateElInvite, stateElLookGame, stateElWaiting, stateElLetsPlay
         */

        var table = [];
        table.push({online: false, show: [stateElOffline]});
        table.push({online: true, onGame: false, inviteMe: false, inviteHim: false, show: [stateElInvite]});
        table.push({online: true, onGame: false, inviteMe: true, inviteHim: false, show: [stateElLetsPlay]});
        table.push({online: true, onGame: false, inviteMe: false, inviteHim: true, show: [stateElWaiting]});
        table.push({online: true, onGame: false, inviteMe: true, inviteHim: true, show: [stateElLetsPlay]});
        table.push({online: true, onGame: true, vsRobot: true, inviteMe: false, inviteHim: false, show: [stateElInvite, stateElLookGame]});
        table.push({online: true, onGame: true, vsRobot: true, inviteMe: true, inviteHim: false, show: [stateElLetsPlay, stateElLookGame]});
        table.push({online: true, onGame: true, vsRobot: true, inviteMe: false, inviteHim: true, show: [stateElWaiting, stateElLookGame]});
        table.push({online: true, onGame: true, vsRobot: true, inviteMe: true, inviteHim: true, show: [stateElLetsPlay, stateElLookGame]});
        table.push({online: true, onGame: true, vsRobot: false, show: [stateElLookGame]});

        /* hide all , and show only from targetVariant.show */
        stateElOffline.hide();
        stateElBusy.hide();
        stateElInvite.hide();
        stateElLookGame.hide();
        stateElWaiting.hide();
        stateElFieldType.hide();
        stateElSignId.hide();
        stateElLetsPlay.hide();

        if (showState) {
            var onGame, inviteMe, inviteHim, targetVariant, yOffset;
            onGame = user.onGameId ? true : false;
            inviteMe = Boolean(LogicInvites.get(user.id, currentUser.id));
            inviteHim = Boolean(LogicInvites.get(currentUser.id, user.id));
            targetVariant = false;
            table.forEach(function (variant) {
                if (variant.online != undefined && variant.online != user.online) return;
                if (variant.onGame != undefined && variant.onGame != onGame) return;
                if (variant.vsRobot != undefined && variant.vsRobot != user.vsRobot) return;
                if (variant.inviteMe != undefined && variant.inviteMe != inviteMe) return;
                if (variant.inviteHim != undefined && variant.inviteHim != inviteHim) return;
                targetVariant = variant;
            });
            if (!targetVariant) {
                Logs.log("ElementPhoto. Can't find targetVariant.", Logs.LEVEL_WARNING, {online: user.online, onGame: onGame, vsRobot: user.vsRobot, inviteMe: inviteMe, inviteHim: inviteHim});
                /* offline variant*/
                targetVariant = table[0];
            }
            yOffset = 0;
            targetVariant.show.forEach(function (element) {
                if (element === stateElLetsPlay) {
                    var invite = LogicInvites.get(user.id, currentUser.id);
                    if (invite.fieldTypeId == LogicXO.FIELD_TYPE_3X3)stateElFieldType.backgroundImage = '/images/photo/inviteField3x3.png';
                    if (invite.fieldTypeId == LogicXO.FIELD_TYPE_15X15)stateElFieldType.backgroundImage = '/images/photo/inviteField15x15.png';
                    var signs = LogicXO.whoIsX(invite.signId, LogicXOSettings.requestedSignId, user.id, currentUser.id);
                    if (signs.XUserId == currentUser.id) {
                        stateElSignId.backgroundImage = '/images/photo/inviteSignX.png';
                    } else {
                        stateElSignId.backgroundImage = '/images/photo/inviteSignO.png';
                    }
                    stateElFieldType.show();
                    stateElFieldType.redraw();
                    stateElSignId.show();
                    stateElSignId.redraw();
                }
                element.y = element._y + yOffset;
                element.show();
                element.redraw();
                yOffset += 20;
                if (element === stateElLetsPlay) yOffset += 15;
            });
        }

//coords : 74, 94
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