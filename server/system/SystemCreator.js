/**
 * Системный компонент.
 * Клиент-серверный компонент!
 */
SystemCreator = function () {
    /**
     * Плата, тут будут элементы.
     */
    var board = {
        elements: {}
    };
    /**
     * Согласно схеме:
     * - создадим элементы;
     * - спаяем элементы;
     * - настроем элементы;
     * - и включим питание.
     */
    this.run = function () {
        // создадим компоненты
        createElements();
        // настроим компоненты
        setupElements();
        // спаяем элементы
        solderElements();
        // включим питание элементов
        switchOnElements();
    };
    /**
     * Запускаем тестовый режим.
     */
    this.runTest = function () {
        this.run();

    };
    /**
     * Создадим все элементы согласно схеме.
     */
    var createElements = function () {
        var params, element;
        log("Создание элементов.");
        // создаем элементы.
        for (var n in BoardScheme) {
            // проверяем структуру компонента.
            // Каждый элемент схемы имеет поля: name, component, soldering, setup

            var d = BoardScheme[n];
            if (!d.name) {
                error("Элемент описнаия схемы должен иметь свойство: name.\r\n" +
                "элемент:" + d.name + "\r\n" +
                "компонент:" + d.component + "\r\n" +
                "файл:" + GLOBAL[d.component].__path);
            }
            if (!d.component) {
                error("Элемент описнаия схемы должен иметь свойство: component.\r\n" +
                "элемент:" + d.name + "\r\n" +
                "компонент:" + d.component + "\r\n" +
                "файл:" + GLOBAL[d.component].__path);
            }
            if (!d.setup) {
                error("Элемент описнаия схемы должен иметь свойство: setup.\r\n" +
                "элемент:" + d.name + "\r\n" +
                "компонент:" + d.component + "\r\n" +
                "файл:" + GLOBAL[d.component].__path);
            }
            if (!d.soldering) {
                error("Элемент описнаия схемы должен иметь свойство: soldering.\r\n" +
                "элемент:" + d.name + "\r\n" +
                "компонент:" + d.component + "\r\n" +
                "файл:" + GLOBAL[d.component].__path);
            }
            // проверяем возможность создать элемент.
            if (!GLOBAL[d.component]) {
                error("Нельзя создать элемент. Нет компонента. Компонент:" + d.component);
            }
            if (board.elements[d.name]) {
                error("Нельзя создать элемент. Элемент с таким именем уже существует. Компонент:" + d.component);
            }

            // создаём элемент.
            element = new GLOBAL[d.component](d.configure);

            // проверяем структуру компонента.
            if (!element.setup || typeof element.setup != 'function') {
                error("Элемент должен иметь функцию: setup().\r\n" +
                "элемент:" + d.name + "\r\n" +
                "компонент:" + d.component + "\r\n" +
                "файл:" + GLOBAL[d.component].__path);
            }
            if (!element.switchOn || typeof element.switchOn != 'function') {
                error("Элемент должен иметь функцию: switchOn().\r\n" +
                "элемент:" + d.name + "\r\n" +
                "компонент:" + d.component + "\r\n" +
                "файл:" + GLOBAL[d.component].__path);
            }
            if (!element.switchOff || typeof element.switchOff != 'function') {
                error("Элемент должен иметь функцию: switchOff().\r\n" +
                "элемент:" + d.name + "\r\n" +
                "компонент:" + d.component + "\r\n" +
                "файл:" + GLOBAL[d.component].__path);
            }

            element.__name = d.name;
            element.__component = d.component;
            board.elements[d.name] = element;
        }
    };
    /**
     * Спаиваем элементы согласно схеме.
     */
    var solderElements = function () {
        var outElement, inPin, inElement;
        var inPath, outPath;

        log("Спаиваем элементы.");
        for (var i in BoardScheme) {
            for (var outPin in BoardScheme[i].soldering) {
                outPath = {
                    element: BoardScheme[i].name,
                    pin: outPin
                };
                inPath = parsePinPath(BoardScheme[i].soldering[outPin], "\r\nэлемент: " + BoardScheme[i].name +
                "\r\nпин: " + BoardScheme[i].soldering[outPin]);

                // проверка пин-путей
                validatePinPath(outPath, 'out', "Спайка элемента:" + BoardScheme[i].name);
                validatePinPath(inPath, 'in', "Спайка элемента:" + BoardScheme[i].name);

                // собствено спайка
                board.elements[outPath.element][outPath.pin] = board.elements[inPath.element][inPath.pin];
            }
        }
    };
    /**
     * Настройка элементов.
     */
    var setupElements = function () {
        log("Настройка элементов.");
        for (var i in BoardScheme) {
            for (var settingName in BoardScheme[i].setup) {
                board.elements[BoardScheme[i].name][settingName] = BoardScheme[i].setup[settingName];
            }
            // выполняем настройку компонента.
            board.elements[BoardScheme[i].name].setup();
        }
    };
    /**
     * Включаем питание.
     */
    var switchOnElements = function () {
        log("Включаем элементы.");
        for (var i in board.elements) {
            board.elements[i].switchOn();
        }
    };
    /**
     * Парсинг пути к пину.
     * Разбирает путь пина, вида elementName.pinName в массив из двух элементов.
     * @param pinPath путь к пину, вида elementName.pinName
     * @param whereMessage сообщение описывающие, где мы производим парсинг, это нужно для логирования ошибок.
     * @returns Array массив, первое значение - имя элемента, второе значение - имя пина.
     */
    var parsePinPath = function (pinPath, whereMessage) {
        if (typeof pinPath != "string") {
            // имя элемента, пин выход, пин вход.
            error("Пин-путь должен иметь тип string." + whereMessage);
        }
        pinPath = pinPath.split('.');
        if (pinPath.length != 2) {
            error("Пин-путь должен иметь вид:'elementName.pinName." + whereMessage);
        }
        return {
            element: pinPath[0],
            pin: pinPath[1]
        };
    };
    /**
     * Проверка пин-пути.
     */
    var validatePinPath = function (pinPath, direction, whereMessage) {
        if (!board.elements[pinPath.element]) {
            error("Элемент не найден." + pinPath.element + "." + whereMessage);
        }
        if (direction == 'in' && !pinPath.pin.match(/^in.*/)) {
            error("Пин должен начинаться на in:" +
                "\r\nпин: " + pinPath.element + '.' + pinPath.pin +
                "\r\n" + whereMessage
            );
        }
        if (direction == 'out' && !pinPath.pin.match(/^out.*/)) {
            error("Пин должен начинаться на out:" +
                "\r\nпин: " + pinPath.element + '.' + pinPath.pin +
                "\r\n" + whereMessage
            );
        }
        if (board.elements[pinPath.element][pinPath.pin] === undefined) {
            error("Пин не найден." +
                "\r\n" + whereMessage +
                "\r\nпин: " + pinPath.element + '.' + pinPath.pin +
                "\r\nкомпонент:" + board.elements[pinPath.element].__component +
                "\r\nфайл компонента:" + GLOBAL[board.elements[pinPath.element].__component].__path +
                ""
            );
        }
    };
};