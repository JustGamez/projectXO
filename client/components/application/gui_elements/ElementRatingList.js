/**
 * Элемент список рейтинга.
 * @constructor
 * Инициирующие параметры:
 * x : number координта X
 * y : number координта Y
 * width: number ширина
 * rowSpacing : number расстояние между строками.
 */
ElementRatingList = function () {
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
     * Ширина.
     * @type {number}
     */
    this.width = 0;

    /**
     * расстояние между строками..
     * @type {number}
     */
    this.rowSpacing = 0;

    /**
     * Кол-во строк отображаемых в рейтинге.
     * @type {number}
     */
    this.rowsCount = 5;

    /**
     * Тут будем хранит массив пользователей.
     * @type {{}[]}
     */
    var rowsData = [];

    /**
     * Массив элементов строк рейтинга.
     * @type {{photo: ElementPhoto, name:ElementGraphicText, score:ElementGraphicText, position:ElementGraphicText}[]}
     */
    var rowsElements = [];

    this.offsetPhoto = 0;
    this.offsetName = 80;
    this.offsetPosition = 250;
    this.offsetScore15x15vsPerson = 300;
    this.offsetScore3x3vsPerson = 350;
    this.offsetScore15x15vsRobot = 400;
    this.offsetScore3x3vsRobot = 450;
    this.widthName = 200;

    /**
     * Создадим нужные нам элементы\домы.
     */
    this.init = function () {
        var row, rowHeight;
        /**
         * Какой высоты считаем строку.
         * @type {number}
         */
        rowHeight = 51;
        for (var i = 0; i < self.rowsCount; i++) {
            row = {};
            /* Массив для всех элементов, что бы показать\скрыть всю строку */
            row.all = [];
            /* Фотография. */
            row.photo = GUI.createElement('ElementPhoto', {
                x: self.x + self.offsetPhoto,
                y: self.y + i * (self.rowSpacing + rowHeight),
                photoWidth: 33,
                photoHeight: 33,
                frameWidth: 4,
                degreesDiapazon: 8
            });
            row.all.push(row.photo);
            /* Фамилиля, имя. */
            row.name = GUI.createElement('ElementGraphicText', {
                x: self.x + self.offsetName,
                y: self.y + i * (self.rowSpacing + rowHeight) + 10,
                width: self.widthName,
                text: ' - '
            });
            row.all.push(row.name);
            /* Позиция в рейтинге. */
            row.position = GUI.createElement('ElementGraphicText', {
                x: self.x + self.offsetPosition,
                y: self.y + i * (self.rowSpacing + rowHeight) + 10,
                width: 50,
                text: '-',
                alignCenter: true
            });
            row.all.push(row.position);
            /* Очки 15х15 с игроком. */
            row.score15x15vsPerson = GUI.createElement('ElementGraphicText', {
                x: self.x + self.offsetScore15x15vsPerson,
                y: self.y + i * (self.rowSpacing + rowHeight) + 10,
                width: 40,
                text: '-',
                alignCenter: true
            });
            row.all.push(row.score15x15vsPerson);
            /* Очки 3х3 с игроком. */
            row.score3x3vsPerson = GUI.createElement('ElementGraphicText', {
                x: self.x + self.offsetScore3x3vsPerson,
                y: self.y + i * (self.rowSpacing + rowHeight) + 10,
                width: 40,
                opacity: 0.7,
                text: '-',
                alignCenter: true
            });
            row.all.push(row.score3x3vsPerson);
            /* Очки 15х15 с роботом. */
            row.score15x15vsRobot = GUI.createElement('ElementGraphicText', {
                x: self.x + self.offsetScore15x15vsRobot,
                y: self.y + i * (self.rowSpacing + rowHeight) + 10,
                width: 40,
                opacity: 0.7,
                text: '-',
                alignCenter: true
            });
            row.all.push(row.score15x15vsRobot);
            /* Очки 3х3 с роботом. */
            row.score3x3vsRobot = GUI.createElement('ElementGraphicText', {
                x: self.x + self.offsetScore3x3vsRobot,
                y: self.y + i * (self.rowSpacing + rowHeight) + 10,
                width: 40,
                opacity: 0.7,
                text: '-',
                alignCenter: true
            });
            row.all.push(row.score3x3vsRobot);
            rowsElements[i] = row;
        }
    };

    /**
     * Покажем элемент.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        /* показ элементов определяет redraw, ввиду специфичности, какие элементы отображать, а какие нет.*/
        self.redraw();
    };

    /**
     * Спрячем элемент.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        for (var i = 0; i < self.rowsCount; i++) {
            for (var j = 0, length = rowsElements[i].all.length; j < length; j++) {
                rowsElements[i].all[j].hide();
            }
        }
    };

    /**
     * Перерисуем элемент.
     */
    this.redraw = function () {
        var data, elements;
        if (!showed) return;
        for (var i = 0; i < self.rowsCount; i++) {
            data = rowsData[i];
            elements = rowsElements[i];
            if (data) {
                elements.photo.update(data.photoData);
                elements.name.setText(data.name);
                elements.position.setText(data.position);
                elements.score15x15vsPerson.setText(data.score15x15vsPerson);
                elements.score3x3vsPerson.setText(data.score3x3vsPerson);
                elements.score15x15vsRobot.setText(data.score15x15vsRobot);
                elements.score3x3vsRobot.setText(data.score3x3vsRobot);
                /* Перерисуем */
                for (var j = 0, length = elements.all.length; j < length; j++) {
                    elements.all[j].show();
                    elements.all[j].redraw();
                }
            } else {
                for (var j = 0, length = elements.all.length; j < length; j++) {
                    elements.all[j].hide();
                }
            }
        }
    };

    /**
     * Обновить данные.
     * В т.ч. перерисует элемент.
     * @param users {{photoData: Object, name: string, score: number, position: number}[]} массив пользователей.
     * @see ElementPhoto.update.
     */
    this.update = function (users) {
        for (var i in users) {
            users[i].position = typeof users[i].position == 'number' ? users[i].position.toString() : '-';
            users[i].score15x15vsPerson = typeof users[i].score15x15vsPerson == 'number' ? users[i].score15x15vsPerson.toString() : '-';
            users[i].score3x3vsPerson = typeof users[i].score3x3vsPerson == 'number' ? users[i].score3x3vsPerson.toString() : '-';
            users[i].score15x15vsRobot = typeof users[i].score15x15vsRobot == 'number' ? users[i].score15x15vsRobot.toString() : '-';
            users[i].score3x3vsRobot = typeof users[i].score3x3vsRobot == 'number' ? users[i].score3x3vsRobot.toString() : '-';
        }
        rowsData = users;
        /* Отсортируем по позициям. */
        rowsData.sort(function (a, b) {
            if (parseInt(a.position) < parseInt(b.position)) return -1;
            if (parseInt(a.position) > parseInt(b.position)) return 1;
            return 0;
        });
        self.redraw();
    };
};