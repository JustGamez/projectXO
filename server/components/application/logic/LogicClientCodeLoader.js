var FS = require('fs');
var OS = require('os');
var PATH = require('path');
var IMAGE_SIZE = require('image-size');
var UGLIFYJS = require('uglify-js');

LogicClientCodeLoader = function () {

    /**
     * ������� ������������� ��������, ��� ������� � ��������� ������ ���������� � ����� ��������.
     * ����� ������� ����� ���������, � ���������� ����� ���� ����� ��������� ����� � ��������
     * � ����� imagesPath.
     * @type {string}
     */
    var imagesPrefix = '/images/';

    /**
     * ������������� �� ���������� ���, ������ ���, ����� ��� �����������.
     * @type {boolean}
     */
    var reloadClientCodeEveryRequest = null;

    /**
     * ���� ������ ��������� ���������� ���.
     * @type {string}
     */
    var clientCodePath = null;

    /**
     * ���������� ���.
     * @type {string}
     */
    var clientCode = '';

    this.init = function () {
        reloadClientCodeEveryRequest = Config.WebSocketServer.reloadClientCodeEveryRequest;
        clientCodePath = Config.WebSocketServer.clientCodePath;
        imagesPath = Config.WebSocketServer.imagesPath;
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
        /* �������� ����������� ����. */
        loadClientCode();
    };

    this.getClientCode = function (callback) {
        if( Config.Project.maintance){
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
            loadClientCode();
        }
        callback(clientCode);
    };

    this.getCommentsWidget = function (callback) {
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
        loadClientCode();
        callback('<pre>' + "Reload Client Code executed!" + new Date().getTime() + '</pre>');
    };

    /**
     * �������� ���� ��������� ��� � �������� ��� � ���������� clientCode.
     */
    var loadClientCode = function () {
        var clientJSCode, advCode, advHeight;
        Logs.log("Load client code.");
        clientJSCode = getClientJSCode();
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

        clientCode = "";
        clientCode += "<HTML>\r\n";
        clientCode += "<HEAD>\r\n";
        clientCode += "<meta charset='utf-8' />\r\n";
        clientCode += "<script src='//vk.com/js/api/xd_connection.js?2' type='text/javascript'></script>\r\n";
        clientCode += "<script type='text/javascript' src='" + Config.Project.urlPrefix + "/js/VKClientCode.js?t=" + (new Date().getTime()).toString() + "'></script>\r\n";
        clientCode += "</HEAD><BODY style='margin:0px;'>\r\n";
        clientCode += getClientImageCode();
        /* application div */
        clientCode += "<div style='height:" + Config.Project.applicationAreaHeight + "px;position:absolute;top:" + advHeight + "px;' id='applicationArea' ></div>\r\n";
        /* comments div */
        clientCode += "<div style='top:" + (Config.Project.applicationAreaHeight + advHeight ) + "px;position:absolute;'>";
        clientCode += "<iframe src='" + Config.Project.urlPrefix + "/commentsWidget' style='border:none; height: " + (Config.VKCommentWidget.height + 44) + "px; width:" + Config.VKCommentWidget.width + ";'></iframe>";
        clientCode += "</div>\r\n";
        clientCode += advCode;
        clientCode += "</BODY></HTML>";

        FS.writeFile(ROOT_DIR + '/js/VKClientCodeSource.js', clientJSCode);

        if (Config.WebSocketServer.compressJSClientCode) {
            var result = UGLIFYJS.minify(clientJSCode, {fromString: true});
            clientJSCode = result.code;
        }
        FS.writeFile(ROOT_DIR + '/js/VKClientCode.js', clientJSCode);
    };

    /**
     * �������� ��� ���� ������, ������������� � �������� �� ��� ���� ������ ����.
     * @param files[]
     */
    var clientCodePrepareCode = function (files) {
        var clientCode, path, file_content, name;
        clientCode = '';
        for (var i in files) {
            path = files[i];
            file_content = FS.readFileSync(path);
            if (file_content == 'ClientServerCompliant') {
                path = path.replace(clientCodePath, '');
                file_content = FS.readFileSync(path);
            }
            // clientCode += "\r\n<script type='text/javascript'>" +
            clientCode += "\r\n/* " + path + " */\r\n";
            clientCode += file_content;
            name = PATH.basename(path, '.js');
            /* ������� ���� � ������ ���������, ��� ����� ��� ������� */
            clientCode += 'if(window["' + name + '"] != undefined){' + 'window["' + name + '"].__path="' + path + '"};\r\n';
        }
        return clientCode;
    };

    /**
     * ������ ���������� js-�������.
     */
    var getClientJSCode = function () {
        var jsFiles, hostname, clientConfigPath, code;
        /* �������� ������ ������ ����������� ����. */
        jsFiles = [];
        jsFiles = jsFiles.concat(getFileListRecursive(clientCodePath + 'system/'));
        jsFiles = jsFiles.concat(getFileListRecursive(clientCodePath + 'components/'));
        /* Include Config file. */
        hostname = OS.hostname();
        clientConfigPath = clientCodePath + 'Config.' + hostname + '.js';
        Logs.log("Generate client code. the config file: " + clientConfigPath, Logs.LEVEL_NOTIFY);
        jsFiles.push(clientConfigPath);
        jsFiles.push(clientCodePath + '/run.js');
        code = clientCodePrepareCode(jsFiles);
        /* generate sapi */
        code += apiRouter.getSAPIJSCode();
        return code;
    };

    /**
     * ������ ���������� ��������.
     */
    var getClientImageCode = function () {
        var imageFiles, imageCode, path, timePostfix, demension;
        imageFiles = getFileListRecursive(imagesPath);
        imageCode = "<script>";
        imageCode += "imagesData = {};";
        timePostfix = "?t=" + new Date().getTime();
        for (var i in imageFiles) {
            path = Config.Project.urlPrefix + imagesPrefix + imageFiles[i].substr(imagesPath.length);
            demension = IMAGE_SIZE(imageFiles[i]);
            imageCode += "\r\nimagesData['" + path + "']={path:'" + path + timePostfix + "',w:" + demension.width + ",h:" + demension.height + "};";
        }
        imageCode += "</script>";
        /* ������� img ���� ��� ������������. */
        imageCode += "<div style='display:none;'>";
        for (var i in imageFiles) {
            path = Config.Project.urlPrefix + imagesPrefix + imageFiles[i].substr(imagesPath.length);
            imageCode += "\r\n<img src='" + path + timePostfix + "'>";
        }
        imageCode += "</div>";
        return imageCode;
    };

    /**
     * ���������� ������ ���� ������, ����������.
     */
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
};

LogicClientCodeLoader = new LogicClientCodeLoader;