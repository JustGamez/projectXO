/* Подключаем загрузчик */

require('./system/loader.js');


/* Передаем управление вхдоной точки. */
logicMain = new LogicMain();
logicMain.main();

