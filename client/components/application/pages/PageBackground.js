/**
 * Страница бэкграудна.
 * @constructor
 */
PageBackground = function PageBackground() {
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

    var elementSound;

    var elementHelpIcon;

    var onHelpPage = false;

    /**
     * @type {ElementGraphicText}
     */
    var elementInviteText;

    /**
     * @type {ElementButton}
     */
    var elementInviteButton;

    this.init = function () {
        var element;
        /* Задний фон */
        element = GUI.createElement('ElementImage', {
            x: 0,
            y: 0,
            src: '/images/table.png'
        });
        self.elements.push(element);
        element = GUI.createElement("ElementFlag", {
            x: 660,
            y: 60,
            srcRest: '/images/buttons/soundOff.png',
            srcHover: '/images/buttons/soundOff.png',
            srcActive: '/images/buttons/soundHover.png',
            defaultState: true,
            onChange: function (newValue) {
                if (newValue) {
                    Sounds.on();
                } else {
                    Sounds.off();
                }
                pageController.redraw();
            }
        });
        elementSound = element;
        self.elements.push(element);
        /* Кнопка `(?)` */
        element = GUI.createElement('ElementButton', {
                x: 693,
                y: 54,
                srcRest: '/images/help/buttons/helpRest.png',
                srcHover: '/images/help/buttons/helpHover.png',
                srcActive: '/images/help/buttons/helpActive.png',
                onClick: function () {
                    if (onHelpPage) {
                        elementHelpIcon.srcRest = '/images/help/buttons/helpRest.png';
                        elementHelpIcon.srcHover = '/images/help/buttons/helpHover.png';
                        elementHelpIcon.srcActive = '/images/help/buttons/helpActive.png';
                        LogicPageHelp.onButtonCloseClick();
                        onHelpPage = false;
                    } else {
                        elementHelpIcon.srcRest = '/images/help/buttons/closeRest.png';
                        elementHelpIcon.srcHover = '/images/help/buttons/closeHover.png';
                        elementHelpIcon.srcActive = '/images/help/buttons/closeActive.png';
                        LogicPageHelp.onButtonHelpClick();
                        onHelpPage = true;
                    }
                }
            }
        );
        elementHelpIcon = element;
        self.elements.push(element);
        element = GUI.createElement('ElementGraphicText', {
            x: 65 + 115,
            y: 62,
            height: 30,
            width: 477,
            scale: 0.8,
            alignCenter: true,
            text: ''
        });
        elementInviteText = element;
        element = GUI.createElement('ElementButton', {
            x: 85,
            y: 57,
            title: 'Принять приглашение.',
            srcRest: '/images/inviteDialog/buttonPlayRest.png',
            srcHover: '/images/inviteDialog/buttonPlayHover.png',
            srcActive: '/images/inviteDialog/buttonPlayActive.png',
            onClick: function () {
                var invite, inviter, currentUser;
                currentUser = LogicUser.getCurrentUser();
                invite = LogicInvites.get(null, currentUser.id);
                if (invite) {
                    inviter = LogicUser.getById(invite.whoId);
                }
                if (inviter) {
                    LogicPageMain.onLetsPlayClick(inviter);
                }
            }
        });
        elementInviteButton = element;
    };

    /**
     * Покажем все элементы на странице.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        self.preset();
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
        var invite, inviter, currentUser;
        currentUser = LogicUser.getCurrentUser();
        if (Sounds.enabled) {
            elementSound.opacity = 1.0;
        } else {
            elementSound.opacity = 0.3;
        }
        if (LogicPageBackground.showInviteDialog) {
            invite = LogicInvites.get(null, currentUser.id);
            if (invite) {
                inviter = LogicUser.getById(invite.whoId);
            }
            if (inviter && inviter.online) {
                var text, signs;
                signs = LogicXO.whoIsX(invite.signId, LogicXOSettings.requestedSignId, inviter.id, currentUser.id);
                text = "Тебя пригласил ";
                var name = inviter.lastName + " " + inviter.firstName[0];
                name = name.length > 16 ? name.substr(0, 16 - 3) + '...' : name;
                text += name + ". ";
                text += "поле " + (inviter.fieldTypeId == LogicXO.FIELD_TYPE_3X3 ? '3х3' : '15х15');
                text += " ваш знак " + ( signs.XUserId == currentUser.id ? 'х' : 'о' ) + ".";
                elementInviteText.setText(text);
                elementInviteButton.show();
                elementInviteButton.redraw();
                elementInviteText.show();
                elementInviteText.redraw();
            } else {
                elementInviteButton.hide();
                elementInviteText.hide();
            }
        } else {
            elementInviteButton.hide();
            elementInviteText.hide();
        }
    };

    /**
     * Обновляем онлайн индикатор и индикатор очков.
     */
    this.redraw = function () {
        if (!showed) return;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
