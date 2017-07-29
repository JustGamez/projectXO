var FS = require('fs');
var OS = require('os');
var PATH = require('path');
var IMAGE_SIZE = require('image-size');
var UGLIFYJS = require('uglify-js');
var SPRITESMITH = require('spritesmith');

LogicClientCodeLoader = function () {

    var self = this;
    /**
     * @type {string}
     */
    var imagesPrefix = '/images/';

    /**
     * @type {boolean}
     */
    var reloadClientCodeEveryRequest = null;

    /**
     * Перезагружать ли код картинок каждый раз.
     * @type {boolean}
     */
    var reloadClientImageCodeEveryRequest = null;

    /**
     * Use Sprite image by SpriteSmith
     * @type {boolean}
     */
    var useSpritedImage = true;

    /**
     * Client code VK.
     * @type {string}
     */
    var clientCodeVK = '';

    /**
     * Client code Standalone.
     * @type {string}
     */
    var clientCodeStandalone = '';

    /**
     * Client code for images
     * @type {string}
     */
    var clientImageCode = '';

    var imagesPath;
    /**
     * Инитиализация
     * @type {string}
     */
    var clientCodePath = null;

    var generateImageSpriteResult = null;

    this.init = function (callback) {
        reloadClientCodeEveryRequest = Config.WebSocketServer.reloadClientCodeEveryRequest;
        reloadClientImageCodeEveryRequest = Config.WebSocketServer.reloadClientImageCodeEveryRequest;
        clientCodePath = Config.WebSocketServer.clientCodePath;
        //@todo is it no WebSocketServer config , but is it LogicClientCodeLoader component config.
        imagesPath = Config.WebSocketServer.imagesPath;
        useSpritedImage = Config.WebSocketServer.useSpritedImage;
        // check before after init
        if (typeof reloadClientCodeEveryRequest != 'boolean') {
            Logs.log("reloadClientCodeEveryRequest given by .setup, must be boolean", Logs.LEVEL_FATAL_ERROR, reloadClientCodeEveryRequest);
        }
        if (typeof clientCodePath != 'string') {
            Logs.log("clientCodePath given by .setup, must be string", Logs.LEVEL_FATAL_ERROR, clientCodePath);
        }
        if (typeof imagesPath != 'string') {
            Logs.log("imagesPath given by .setup, must be string", Logs.LEVEL_FATAL_ERROR, imagesPath);
        }
        if (typeof useSpritedImage != 'boolean') {
            Logs.log("useSpritedImage given by .setup, must be boolean", Logs.LEVEL_FATAL_ERROR, useSpritedImage);
        }
        /* Обновим клиентский код. */
        generateImageSprite(function (result) {
            generateImageSpriteResult = result;
            reloadMainClientCode();
            loadClientCodeVK();
            loadClientCodeStandalone();
            callback();
        });
    };

    /**
     * DEPRECATED
     * @TODO удалить после настройки
     * @param callback
     */
    this.getClientCode = function (callback) {
        self.getClientCodeVK(callback);
    };

    this.getClientCodeVK = function (callback) {
        if (Config.Project.maintance) {
            var html;
            html = '';
            html += '\<!DOCTYPE html>\
            <html>\
                <head><meta charset=utf-8></head>\
            <div style="text-align:center;">Игра на техническом обслуживании, пожалуйста зайдите немного позже.</div>\
            </html>\
                ';
            callback(html);
        }
        if (reloadClientCodeEveryRequest) {
            loadClientCodeVK();
        }
        callback(clientCodeVK);
    };

    this.getClientCodeStandalone = function (callback) {
        if (Config.Project.maintance) {
            var html;
            html = '';
            html += '\<!DOCTYPE html>\
            <html>\
                <head><meta charset=utf-8></head>\
            <div style="text-align:center;">Игра на техническом обслуживании, пожалуйста зайдите немного позже.</div>\
            </html>\
                ';
            callback(html);
        }
        if (reloadClientCodeEveryRequest) {
            loadClientCodeStandalone();
        }
        callback(clientCodeStandalone);
    };

    this.getVKCommentsWidget = function (callback) {
        var VKCommentsWidgetCode = "" +
            "<html>" +
            "<head>" +
            "<script type='text/javascript' src='//vk.com/js/api/openapi.js?116'></script>" +
            "<script>VK.init({apiId: " + Config.SocNet.appId + ", onlyWidgets: true});</script>" +
            "</head>" +
            "<body style='margin:0px;'>" +
            "<div id='vk_comments'></div>" +
            "<script type='text/javascript'>" +
            "VK.Widgets.Comments('vk_comments', {limit: 5, height: " + (Config.VKCommentWidget.height).toString() + ", width: " + (Config.VKCommentWidget.width).toString() + ", attach: '*', pageUrl: 'http://vk.com/app" + Config.SocNet.appId + "'});" +
            "</script>" +
            "</body>" +
            "</html>";
        callback(VKCommentsWidgetCode);
    };

    this.reloadClientCode = function (callback) {
        reloadMainClientCode();
        loadClientCodeVK();
        loadClientCodeStandalone();
        callback('<pre>' + "Reload Client Code executed!" + new Date().getTime() + '</pre>');
    };

    var loadClientCodeVK = function () {
        var advCode, advHeight, code;
        Logs.log("Load client code.");

        /* ���������� ��������� ���. */
        if (Config.Adv) {
            var advId = Config.Adv.id;
            var advHash = Config.Adv.hash;
            advCode = "<div id='vk_ads_" + advId + "'></div>" +
                "<script type='text/javascript'>" +
                "setTimeout(function() {" +
                "   var adsParams = {'ad_unit_id':" + advId + ",'ad_unit_hash':'" + advHash + "'};" +
                "   function vkAdsInit() {" +
                "       VK.Widgets.Ads('vk_ads_" + advId + "', {}, adsParams);" +
                "   }" +
                "   if (window.VK && VK.Widgets) {" +
                "       vkAdsInit();" +
                "   } else {" +
                "       if (!window.vkAsyncInitCallbacks) window.vkAsyncInitCallbacks = [];" +
                "       vkAsyncInitCallbacks.push(vkAdsInit);" +
                "       var protocol = ((location.protocol === 'https:') ? 'https:' : 'http:');" +
                "       var adsElem = document.getElementById('vk_ads_" + advId + "');" +
                "       var scriptElem = document.createElement('script');" +
                "       scriptElem.type = 'text/javascript';" +
                "       scriptElem.async = true;" +
                "       scriptElem.src = protocol + '//vk.com/js/api/openapi.js?116';" +
                "       adsElem.parentNode.insertBefore(scriptElem, adsElem.nextSibling);" +
                "   }" +
                "}, 0);" +
                "</script>";
            advCode = '<div style="height:125px;">' + advCode + "</div>";
            advHeight = 125;
        } else {
            advCode = '';
            advHeight = 0;
        }
        //@todo сделать тут HTML5
        code = "";
        code += "<HTML>\r\n";
        code += "<HEAD>\r\n";
        code += "<meta charset='utf-8' />\r\n";
        code += "<script src='//vk.com/js/api/xd_connection.js?2' type='text/javascript'></script>\r\n";
        code += "<script>window.PLATFORM_ID = 'VK';</script>";
        code += "<script type='text/javascript' src='/js/MainClientCode.js?t=" + (new Date().getTime()).toString() + "'></script>\r\n";
        code += "</HEAD><BODY style='margin:0px;'>\r\n";
        code += getClientImageCode();
        /* application div */
        code += "<div style='height:" + Config.Project.applicationAreaHeight + "px;position:absolute;top:" + advHeight + "px;' id='applicationArea' ></div>\r\n";
        /* comments div */
        code += "<div style='top:" + (Config.Project.applicationAreaHeight + advHeight ) + "px;position:absolute;'>";
        code += "<iframe src='/service/VKCommentsWidget' style='border:none; height: " + (Config.VKCommentWidget.height + 44) + "px; width:" + Config.VKCommentWidget.width + ";'></iframe>";
        code += "</div>\r\n";
        code += advCode;
        code += "</BODY></HTML>";
        clientCodeVK = code;
    };

    /**
     * Загрузка клиенсткого кода для стэндэлон версии.
     */
    var loadClientCodeStandalone = function () {
        Logs.log("Load client code.");
        var code;
        code = "";
        code += "<!DOCTYPE html>";
        code += "<html>";
        code += "<head>";
        code += "<meta charset='utf-8' />";
        code += "<script>window.PLATFORM_ID = 'STANDALONE';</script>";
        code += "<script src='/js/MainClientCode.js?t=" + (new Date().getTime()).toString() + "'></script>\r\n";
        code += "</head>";
        code += "<body>";
        code += "<div style='height:" + Config.Project.applicationAreaHeight + "px;position:absolute;' id='applicationArea' ></div>\r\n";
        code += getClientImageCode();
        code += "</body>";
        code += "</html>";

        clientCodeStandalone = code;
    };

    /**
     * Перезагрузка основного кода клиента.
     */
    var reloadMainClientCode = function () {
        var mainClientJSCode;
        mainClientJSCode = getMainClientJSCode();
        //@todo path to JS move to Config file
        //FS.writeFile(DIR_ROOT + '/public/js/MainClientCodeSource.js', mainClientJSCode);

        //@todo LogicClintCodeloader.config?
        if (Config.WebSocketServer.compressJSClientCode) {
            mainClientJSCode = 'function ___(){ ' + mainClientJSCode + ' };___();';
            var result = UGLIFYJS.minify(mainClientJSCode);
            mainClientJSCode = result.code;
        }
        //@todo path to JS move to Config file
        FS.writeFileSync(DIR_ROOT + '/public/js/MainClientCode.js', mainClientJSCode);
    };

    /**
     * @param files[]
     */
    var clientCodePrepareCode = function (files) {
        var path, file_content, name, code;
        code = '';
        for (var i in files) {
            path = files[i];
            file_content = FS.readFileSync(path);
            if (file_content == 'ClientServerCompliant') {
                path = path.replace(clientCodePath, '');
                file_content = FS.readFileSync(path);
            }
            code += "\r\n/* " + path + " */\r\n";
            code += file_content;
            name = PATH.basename(path, '.js');
            code += 'if(window["' + name + '"] != undefined){' + 'window["' + name + '"].__path="' + path + '"};\r\n';
        }
        return code;
    };

    /**
     * Собирает основной JS код клиента.
     * Этот код одинаков для всех социальных сетей(платформ).
     */
    var getMainClientJSCode = function () {
        var jsFiles, hostname, clientConfigPath, code;
        jsFiles = [];
        jsFiles = jsFiles.concat(getFileListRecursive(clientCodePath + 'system/'));
        jsFiles = jsFiles.concat(getFileListRecursive(clientCodePath + 'components/'));
        /* Include Config file. */
        hostname = OS.hostname();
        var parentFolderName = (function () {
            var cwd;
            cwd = process.cwd().split(PATH.sep);
            cwd.pop();
            return cwd.pop();
        })();
        clientConfigPath = clientCodePath + 'config.' + hostname + '.' + parentFolderName + '.js';
        Logs.log("Generate client code(MainClientCode). The config file: " + clientConfigPath, Logs.LEVEL_NOTIFY);
        jsFiles.push(clientConfigPath);
        jsFiles.push(clientCodePath + '/run.js');
        code = clientCodePrepareCode(jsFiles);
        /* generate sapi */
        code += apiRouter.getSAPIJSCode();
        code += getGUIGeneratedCode();
        return code;
    };

    var getClientImageCode = function () {
        if (useSpritedImage) {
            return getClientImageCodeSprited();
        } else {
            return getClientImageCodeImageList();
        }
    };

    var getClientImageCodeSprited = function () {
        var imageCode, path, timePostfix, demension;
        if (!reloadClientImageCodeEveryRequest && clientImageCode) {
            return clientImageCode;
        }
        imageCode = "<script>";
        imageCode += "imagesData = {};";
        timePostfix = "?t=" + new Date().getTime();
        for (var i in generateImageSpriteResult.coordinates) {
            path = i.replace('../public', '');
            imageCode += "\r\nimagesData['" + path + "']={" + "" +
                "path:'" + '/images/sprite.png' + timePostfix + "'," +
                "w:" + generateImageSpriteResult.coordinates[i].width + "," +
                "h:" + generateImageSpriteResult.coordinates[i].height + "," +
                "x:" + generateImageSpriteResult.coordinates[i].x + "," +
                "y:" + generateImageSpriteResult.coordinates[i].y + "" +
                "};";
        }
        imageCode += "</script>";
        imageCode += "<div style='display:none;'>";
        imageCode += "<img src='/images/sprite.png" + timePostfix + "'>";
        imageCode += "</div>";
        // cache it
        clientImageCode = imageCode;
        return imageCode;
    };

    /**
     * Формирует Js-код картинок.
     */
    var getClientImageCodeImageList = function () {
        var imageFiles, imageCode, path, timePostfix, demension;
        if (!reloadClientImageCodeEveryRequest && clientImageCode) {
            return clientImageCode;
        }
        imageFiles = getFileListRecursive(imagesPath);
        imageCode = "<script>";
        imageCode += "imagesData = {};";
        timePostfix = "?t=" + new Date().getTime();
        for (var i in imageFiles) {
            path = imagesPrefix + imageFiles[i].substr(imagesPath.length);
            demension = IMAGE_SIZE(imageFiles[i]);
            imageCode += "\r\nimagesData['" + path + "']={path:'" + path + timePostfix + "',w:" + demension.width + ",h:" + demension.height + "};";
        }
        imageCode += "</script>";
        imageCode += "<div style='display:none;'>";
        for (var i in imageFiles) {
            path = imagesPrefix + imageFiles[i].substr(imagesPath.length);
            imageCode += "\r\n<img src='" + path + timePostfix + "'>";
        }
        imageCode += "</div>";
        // cache it
        clientImageCode = imageCode;
        return imageCode;
    };

    var getFileListRecursive = function (basePath) {
        var dirList, path, files;
        files = [];
        dirList = FS.readdirSync(basePath);
        for (var i in dirList) {
            path = basePath + dirList[i];
            if (FS.statSync(path).isDirectory()) {
                files = files.concat(getFileListRecursive(path + '/'));
            } else {
                files.push(path);
            }
        }
        return files;
    };

    var generateImageSpriteLoaded = false;

    var generateImageSprite = function (callback) {
        var sprites, spritePath;

        if (generateImageSpriteLoaded) return;
        generateImageSpriteLoaded = true;
        spritePath = '../public/images/sprite.png';

        if (FS.existsSync(spritePath)) {
            FS.unlink(spritePath);
        }

        sprites = getFileListRecursive(imagesPath);

        Logs.log("SPRITESMITH BEGIN", Logs.LEVEL_NOTIFY);

        SPRITESMITH.run({src: sprites}, function handleResult(err, result) {
            // result.image; // Buffer representation of image
            // result.coordinates; // Object mapping filename to {x, y, width, height} of image
            // result.properties; // Object with metadata about spritesheet {width, height}
            if (err) {
                console.log(err);
            }
            // coordinates: ['../public/images/buttons/addFriendActive.png': { x: 75, y: 1353, width: 75, height: 80 },
            //'../public/images/buttons/addFriendHover.png': { x: 150, y: 1353, width
            //console.log(result);
            fsResult = FS.writeFileSync(spritePath, result.image, 'binary');
            Logs.log("SPRITESMITH Complete", Logs.LEVEL_NOTIFY);
            callback(result);
        });
    };

    var getGUIGeneratedCode = function () {

        /*
         1 - get PageBlock folder files
         2 - for each generate add block code
         */
        var files, guiCode, pageBlocks, name;
        guiCode = '';
        guiCode += 'GUI.init();' + "\r\n";
        pageBlocks = [];
        // page-blocks
        files = getFileListRecursive(clientCodePath + 'components/application/page_blocks/');
        files.forEach(function (filePath) {
            name = PATH.basename(filePath, '.js');
            if (name.substr(0, 9) === 'PageBlock') {
                pageBlocks.push(name);
            }
        });
        guiCode += ' PageController.addBlocks([' + pageBlocks.join(',') + ']);' + "\r\n";
        // pages
        files = getFileListRecursive(clientCodePath + 'components/application/pages/');
        files.forEach(function (filePath) {
            name = PATH.basename(filePath, '.js');
            if (name.substr(0, 4) === 'Page') {
                guiCode += ' ' + name + '.init();' + "\r\n";
            }

        });

        return 'document.addEventListener("DOMContentLoaded", function() {' + guiCode + '});';
    }
};

LogicClientCodeLoader = new LogicClientCodeLoader;