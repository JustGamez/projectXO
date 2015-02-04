/**
 * Адаптация для работы с гуёй. В данном случае это браузер.
 * Все запросы к гуи должны быть реализованы тут. и тут: GUIDom
 * @constructor
 * @property x {int}
 * @property y {int}
 * @property width {int}
 * @property height {int}
 * @property backgroundImage {url}
 * @property innerHTML {string}
 * @property pointer {GUI.POINTER_*}
 * @property opacity {Number}
 * @property fontWeight {String}
 * @property fontSize {String}
 * @property fontFamily {String}
 * @property color {String}
 * @property textShadow {String}
 * @property borderRadius {String}
 * @property border {String}
 * @property borderTop {String}
 * @property borderRight {String}
 * @property borderBottom {String}
 * @property borderLeft {String}
 * @property padding {String}
 * @property boxShadow {String}
 * @property lineHeight {Number}
 * @property background {String}
 * @property transform {String}
 * @property title {String}
 */
GUIDom = function () {
    var self = this;

    /**
     * Старые свойства.
     * Их мы будем хранить, что бы не перерисовывать лишний раз,
     * то что не меняется.
     * @type {{}}
     */
    var oldProps = {};

    /**
     * Показывтаь ли дом.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Дом браузера.
     * @type {Element}
     */
    var dom = null;

    /**
     * Создается элемент браузера
     * Настраиваются минимальные параметры
     * @param type [string] input|div
     * @param parent [GUIDom] родитель.
     */
    this.init = function (type, parent) {
        /* Начальное значение старых свойств */
        for (var i in props) {
            oldProps[i] = undefined;
        }
        /* Создадим дом */
        if (type == 'input') {
            dom = document.createElement("input");
        } else {
            dom = document.createElement("div");
        }
        /* значения по умолчанию для дом-ов. */
        dom.style.position = 'absolute';
        dom.style.overflow = 'hidden';
        /* no dragable by default */
        dom.ondragstart = function () {
            return false;
        };
        /* hidden mode..:begin */
        if (GUIDom.hidePictures) {
            document.body.style.opacity = 0.01;
            dom.style.border = '1px dotted grey';
        }
        /* Указанная прозрачность картинок. */
        if (GUIDom.pictureOpacities) {
            document.body.style.opacity = GUIDom.pictureOpacities;
            dom.style.border = '2px solid lightgrey';
            //dom.style.backgroundColor = 'black';
        }
        /* hidden mode..:finish */
        /* Добавим дом к родителю. */
        this.__dom = dom;
        if (parent == undefined) {
            parent = GUI.getCurrentParent();
        } else {
            parent = parent.__dom;
        }
        parent.appendChild(dom);
    };

    /**
     * Покажем дом.
     */
    this.show = function () {
        if (showed == true) {
            return;
        }
        showed = true;
        dom.style.display = 'block';
        self.redraw();
    };

    /**
     * Спрячем дом.
     */
    this.hide = function () {
        if (showed == false) {
            return;
        }
        showed = false;
        dom.style.display = 'none';
    };

    /**
     * Перересовка дома.
     * Только те свойства, которые изменились.
     */
    this.redraw = function () {
        if (!showed) {
            return;
        }
        for (var name in props) {
            if (oldProps[name] != self[name]) {
                props[name].call();
                oldProps[name] = self[name];
            }
        }
    };

    /**
     * Прицепляем событие.
     * @param eventId
     * @param callback
     * @param context
     */
    this.bind = function (eventId, callback, context) {
        var eventName;
        eventName = GUI.eventNames[eventId];
        if (!eventName) {
            Logs.log("undefined gui eventId:" + eventId, Logs.LEVEL_FATAL_ERROR);
        }
        dom.addEventListener(eventName, function (event) {
            callback.call(context, event, dom);
        }, false);
    };

    /* Далее идут методы перерисовки. */
    var redrawX = function () {
        dom.style.left = self.x + 'px';
    };
    var redrawY = function () {
        dom.style.top = self.y + 'px';
    };
    var redrawWidth = function () {
        dom.style.width = self.width + 'px';
    };
    var redrawHeight = function () {
        dom.style.height = self.height + 'px';
    };
    var redrawBackgroundImage = function () {
        var url;
        /* абсолютный url, используем без изменений */
        if (self.backgroundImage.indexOf('http://') != 0) {
            url = GUI.getImageURL(self.backgroundImage);
        } else {
            url = self.backgroundImage;
        }
        if (GUIDom.hidePictures) {
            if (GUIDom.makeTransparent) {
                dom.style.backgroundImage = 'url(' + url + ')';
            } else {
                dom.style.fontSize = '10px';
                url = url.replace('/images/', '');
                dom.innerHTML = url.substr(url.indexOf('/') + 1, url.indexOf('.') - url.indexOf('/') - 1);
            }
        } else {
            dom.style.backgroundImage = 'url(' + url + ')';
        }
    };
    var redrawInnerHTML = function () {
        if (GUIDom.hidePictures) {
            if (GUIDom.makeTransparent) {
                dom.innerHTML = self.innerHTML;
            } else {
                dom.innerText = self.innerHTML;
            }
        } else {
            dom.innerHTML = self.innerHTML;
        }
    };
    var redrawPointer = function () {
        dom.style.cursor = self.pointer;
    };
    var redrawOpacity = function () {
        dom.style.opacity = self.opacity;
    };
    var redrawFontWeight = function () {
        dom.style.fontWeight = self.fontWeight;
    };
    var redrawFontSize = function () {
        dom.style.fontSize = self.fontSize;
    };
    var redrawFontFamily = function () {
        dom.style.fontFamily = self.fontFamily;
    };
    var redrawColor = function () {
        dom.style.color = self.color;
    };
    var redrawTextShadow = function () {
        dom.style.textShadow = self.textShadow;
    };
    var redrawBorderRadius = function () {
        dom.style.borderRadius = self.borderRadius;
    };
    var redrawBorder = function () {
        dom.style.border = self.border;
    };
    var redrawBorderTop = function () {
        dom.style.borderTop = self.borderTop;
    };
    var redrawBorderRight = function () {
        dom.style.borderRight = self.borderRight;
    };
    var redrawBorderBottom = function () {
        dom.style.borderBottom = self.borderBottom;
    };
    var redrawBorderLeft = function () {
        dom.style.borderLeft = self.borderLeft;
    };
    var redrawPadding = function () {
        dom.style.padding = self.padding;
    };
    var redrawBoxShadow = function () {
        dom.style.boxShadow = self.boxShadow;
    };
    var redrawLineHeight = function () {
        dom.style.lineHeight = self.lineHeight;
    };
    var redrawBackground = function () {
        dom.style.background = self.background;
    };
    var redrawTransform = function () {
        dom.style.transform = self.transform;
    };
    var redrawTitle = function () {
        dom.setAttribute('title', self.title);
    };
    /**
     * Имена свойств и их методы обработки.
     * @type {{x: Function, y: Function, width: Function, height: Function, backgroundImage: *, innerHTML: Function, pointer: Function, opacity: Function, fontWeight: *, fontSize: *, fontFamily: Function, color: Function, textShadow: Function, borderRadius: Function, border: Function, borderTop: Function, borderRight: Function, borderBottom: Function, borderLeft: Function, padding: Function, boxShadow: Function, lineHeight: Function, background: Function, transform: Function, title: *}}
     */
    var props = {
        x: redrawX,
        y: redrawY,
        width: redrawWidth,
        height: redrawHeight,
        backgroundImage: redrawBackgroundImage,
        innerHTML: redrawInnerHTML,
        pointer: redrawPointer,
        opacity: redrawOpacity,
        fontWeight: redrawFontWeight,
        fontSize: redrawFontSize,
        fontFamily: redrawFontFamily,
        color: redrawColor,
        textShadow: redrawTextShadow,
        borderRadius: redrawBorderRadius,
        border: redrawBorder,
        borderTop: redrawBorderTop,
        borderRight: redrawBorderRight,
        borderBottom: redrawBorderBottom,
        borderLeft: redrawBorderLeft,
        padding: redrawPadding,
        boxShadow: redrawBoxShadow,
        lineHeight: redrawLineHeight,
        background: redrawBackground,
        transform: redrawTransform,
        title: redrawTitle
    };
};

/**
 * Этот код определит нужно ли делать картинки невидимыми.
 * Это нужно для БоссМоуда на саммом деле :)
 * В результате мы установим GUIDom.hidePictures = [true|false].
 */
(function () {
    /* Распарсим по быстром url адрес. */
    var urlParams;
    (function () {
        var tmp1, tmp2;
        urlParams = {};
        url = window.location.href;
        tmp1 = url.substr(url.indexOf('?') + 1).split('&');
        for (var i in tmp1) {
            tmp = tmp1[i].split('=');
            urlParams[tmp[0]] = tmp[1];
        }
    })();
    /* Режим скрытых картинок */
    if (urlParams.hide_pictures && urlParams.hide_pictures == 'true') {
        GUIDom.hidePictures = true;
    } else {
        GUIDom.hidePictures = false;
    }
    if (urlParams.picture_opacities) {
        GUIDom.pictureOpacities = urlParams.picture_opacities;
    }
})();