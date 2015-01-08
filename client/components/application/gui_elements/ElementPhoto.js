/**
 * Элемент фотография.
 * @constructor
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
     * Текст появляется при наведении мышки.
     * @type {string}
     */
    var title = '';

    /**
     * Кэллбэк при нажатии левой кнопки мыши.
     * @type {Function}
     */
    var onClick = null;

    /**
     * Состояние индикатора онлайн.
     * @type {boolean}
     */
    var online = false;

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
     * Дом онлайн индикатора.
     * @type {GUIDom}
     */
    var domOnlineIndicator = null;

    /**
     * Ширина бордюра рамки.
     * @type {number}
     */
    var borderWidth = 1;

    /**
     * Ширина рамки
     * @type {number}
     */
    var frameWidth = 7;

    /**
     * Ширина фотографии.
     * Стандартная 50 на 50 фотография.
     * @type {number}
     */
    var photoWidth = 50;

    /**
     * Высота фотографии.
     * Стандартная 50 на 50 фотография.
     * @type {number}
     */
    var photoHeight = 50;

    /**
     * Ширина области активности вокруг фотографии.
     * @type {number}
     */
    var regionWidth = 80;

    /**
     * Высота области активности вокруг фотографии.
     * @type {number}
     */
    var regionHeight = 95;

    /**
     * Пользовательская информация.
     * Будет передаваться при клике.
     * @type {{}}
     */
    var photoInfo = {};

    /**
     * Создадим домы и настроем их.
     */
    this.init = function () {
        /* Границы фотографии */
        domRegion = GUI.createDom();
        domRegion.x = self.x;
        domRegion.y = self.y;
        domRegion.width = regionWidth;
        domRegion.height = regionHeight;
        domRegion.pointer = GUI.POINTER_HAND;
        GUI.bind(domRegion, GUI.EVENT_MOUSE_CLICK, onClickMediator, this);
        /* Бордюр рамки фотографии */
        domBorder = GUI.createDom(domRegion);
        domBorder.x = 5;
        domBorder.y = 5;
        domBorder.border = borderWidth + 'px solid #ebb';
        domBorder.width = frameWidth * 2 + photoWidth;
        domBorder.height = frameWidth * 2 + photoHeight;
        /* Рамка фотографии */
        domFrame = GUI.createDom(domBorder);
        domFrame.border = frameWidth + 'px solid #eee';
        domFrame.x = 0;
        domFrame.y = 0;
        domFrame.width = photoWidth;
        domFrame.height = photoHeight;
        /* Фотография */
        domPhoto = GUI.createDom(domFrame);
        domPhoto.x = 0;
        domPhoto.y = 0;
        domPhoto.height = photoHeight;
        domPhoto.width = photoWidth;
        /* Индикатор онлайн пользователя */
        domOnlineIndicator = GUI.createDom(domRegion);
        domOnlineIndicator.x = 12;
        domOnlineIndicator.y = regionHeight - 18;
        domOnlineIndicator.width = 15;
        domOnlineIndicator.height = 14;
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
        domOnlineIndicator.show();
        self.redraw();
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
        domOnlineIndicator.hide();
    };

    /**
     * Перерисуем фотографию.
     */
    this.redraw = function () {
        if (!showed) return;
        domRegion.title = title;
        domPhoto.backgroundImage = src;
        domBorder.transform = 'rotate(' + getRealRandom(src) + 'deg)';
        if (online) {
            domOnlineIndicator.backgroundImage = '/images/photo/iconOnline.png';
            domOnlineIndicator.title = 'онлайн';
        } else {
            domOnlineIndicator.backgroundImage = '/images/photo/iconOffline.png';
            domOnlineIndicator.title = 'оффлайн';
        }
        domRegion.redraw();
        domPhoto.redraw();
        domBorder.redraw();
        domFrame.redraw();
        domOnlineIndicator.redraw();
    };

    /**
     * Обновление данных фотографии.
     * @param params {Object}
     */
    this.update = function (params) {
        src = params.src;
        title = params.title;
        onClick = params.onClick;
        online = params.online;
        photoInfo = params.photoInfo;
    };

    /**
     * Случайное условно-постоянное число на основе строки.
     * @returns {number}
     */
    var getRealRandom = function (string) {
        // random rotate photo
        // super real-random
        // считаем сумму всех кодов знаков из строки, умноженных на позицию знака(*256)
        var deg, number, date, superPosition, degreesDiapazon;
        degreesDiapazon = 16;
        superPosition = 360;
        number = 0;
        for (var i in string) {
            number += string.charCodeAt(i) * ((i * 256) + 1);
        }
        date = new Date;
        number += date.getDay(); //TODO switch to getTime()
        // super real-random
        deg = (number % ( superPosition + 1)) - (( superPosition + 1) / 2);
        deg = deg / superPosition * degreesDiapazon;
        return deg;
    };

    /**
     * Посредник кэллбэка, т.к. кэллбак присваивается один раз.
     * И в процессе может меняться.
     */
    var onClickMediator = function () {
        onClick.call(null, photoInfo);
    }
};