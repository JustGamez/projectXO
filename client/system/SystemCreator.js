/**
 * Системный компонент.
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
        // спаяем элементы
        solderElements();
        // настроим компоненты
        setupElements();
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
            // Каждый элемент схемы имеет поля: name, component, soldering, setup
            with (BoardScheme[n]) {

                // проверяем возможность создать элемент.
                if (!GLOBAL[component]) {
                    error("Нельзя создать элемент. Нет компонента. Компонент:" + component);
                }
                if (board.elements[name]) {
                    error("Нельзя создать элемент. Элемент с таким именем уже существует. Компонент:" + component);
                }

                // создаём элемент.
                element = new GLOBAL[component];

                // проверяем структуру компонента.
                if (!element.switchOn || typeof element.switchOn != 'function') {
                    error("Элемент должен иметь функцию switchOn.\r\n" +
                    "элемент:" + name + "\r\n" +
                    "компонент:" + component + "\r\n" +
                    "файл:" + GLOBAL[component].__path);
                }
                if (!element.switchOff || typeof element.switchOff != 'function') {
                    error("Элемент должен иметь функцию switchOff.\r\n" +
                    "элемент:" + name + "\r\n" +
                    "компонент:" + component + "\r\n" +
                    "файл:" + GLOBAL[component].__path);
                }

                element.__name = name;
                element.__component = component;
                board.elements[name] = element;
            }
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