var FS = require('fs');
var PATH = require('path');

ApiRouterGenerator = function () {

    this.generate = function () {

        generateCAPIComponents(getCAPIMap());

        return generateSAPIMapCode(getSAPIMap());
    };

    this.generateClient = function () {
        var groupName, map;

        map = getCAPIMap();
        // for client
        // формирование карты для ApiRouter. { CAPI*: CAPI*, ... }
        var code2 = '';
        code2 += 'ApiRouter.map = {\r\n';
        for (groupName in map) {
            code2 += '\t' + groupName + ' : ' + groupName + ',\r\n';
        }
        // remove last symbol
        code2 = code2.substr(0, code2.length - 1);
        code2 += '};\r\n';
        code2 = 'document.addEventListener("DOMContentLoaded", function() {' + code2 + '})';
        console.log(code2);
    };

    /**
     * Generate capi map from exist code.
     * @returns {*}
     */
    var getCAPIMap = function () {
        var path, list, groupName, methodName, map;
        path = CONST_DIR_CLIENT + 'components/application/capi/';
        list = FS.readdirSync(path);
        map = {};
        for (var i in list) {
            groupName = getComponentNameFromPath(path + list[i]);
            require(path + list[i]);
            map[groupName] = [];
            for (methodName in global[groupName]) {
                if (typeof global[groupName][methodName] === 'function') {
                    map[groupName][methodName] = true;
                }
            }
        }
        return map;
    };

    /**
     * Generate sapi map from exist code.
     * @returns {*}
     */
    var getSAPIMap = function () {
        var path, list, groupName, methodName, map;
        path = CONST_DIR_COMPONENTS + '/application/sapi/';
        list = FS.readdirSync(path);
        map = {};
        for (var i in list) {
            groupName = getComponentNameFromPath(path + list[i]);
            require(path + list[i]);
            map[groupName] = [];
            for (methodName in global[groupName]) {
                if (typeof global[groupName][methodName] === 'function') {
                    map[groupName][methodName] = true;
                }
            }
        }
        return map;
    };

    var getComponentNameFromPath = function (path) {
        return PATH.basename(path).replace('.js', '');
    };

    /**
     *
     * @param map
     */
    var generateSAPIMapCode = function (map) {
        var groupName, code;
        code = '';
        code += ' ApiRouter.setMap({\r\n';
        for (groupName in map) {
            code += "\t" + groupName + ":" + groupName + ",\r\n";
        }
        code += "});\r\n";
        return code;
    };

    /**
     *
     */
    var generateCAPIComponents = function (map) {
        var groupName, methodName;
        var code = '';
        for (groupName in map) {
            code = '';
            code += groupName + ' = function(){\r\n\r\n';
            for (methodName in map[groupName]) {
                code += '\tthis.' + methodName + ' = function(){\r\n\r\n';
                code += '\t\tvar args, toUserId;\r\n';
                code += '\t\targs = Array.prototype.slice.call(arguments);\r\n';
                code += '\t\ttoUserId = args.shift();\r\n';
                code += '\t\tLogicUser.sendToUser(toUserId, "' + groupName + '", "' + methodName + '", args);\r\n';
                code += '\t};\r\n\r\n';
            }
            code += '};\r\n';
            code += groupName + ' = new ' + groupName + '();\r\n';
            FS.writeFileSync(CONST_DIR_COMPONENTS + 'generated/' + groupName + '.js', code);
        }
    };

};


ApiRouterGenerator = new ApiRouterGenerator;