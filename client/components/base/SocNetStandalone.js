/**
 * Компонет для работы с социальной сетью(платформой): сайтом http://krestiki-noliki.xyz/
 * @constructor
 */

SocNetStandalone = function () {

    this.init = function () {
        //do something here
    };

    this.getAuthParams = function () {
        Logs.log("TODO me, SocNetStandalone.getAuthParams", Logs.LEVEL_WARNING);
        return {
            //some params
        };
    };

    this.getUserProfileUrl = function () {
        // TODO return something! may be url to dummy image!:)
        Logs.log("TODO Me, SocNetStandalone.getUserProfileUrl", Logs.LEVEL_WARNING);
        return '/notFound/todo/me/please/:)';
    };

    this.openInviteFriendDialog = function () {
        //@todo
        Logs.log("TODO me SocNetStandalone.openIvniteFirendDialog", Logs.LEVEL_WARNING);
        alert('Sorry, but functional is not realized!');
    };

    this.getSocNetUserId = function () {
        var socNetUserId;
        socNetUserId = getQueryVariable('socNetUserId');
        if (!socNetUserId) {
            //@todo we need a real guest!!! :)
            Logs.log("TODO Me. SocNetStandlaone.getSocNetUesrId and ... guset mode :)", Logs.LEVEL_WARNING);
            socNetUserId = 111; // is it guest!!!
        }
        return socNetUserId;
    };

    /**
     * Detect is now is a that soc net\platform.
     * @returns {boolean}
     */
    this.detectIsItThat = function () {
        if (window.PLATFORM_ID == 'STANDALONE') return true;
        return false;
    };

    /**
     * Return some value by key from GET params
     * @todo is it common tools, look on SocNetVK, resulable code anti-pattenr
     * @param variable
     * @returns {*}
     */
    var getQueryVariable = function (variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        Logs.log('Query Variable ' + variable + ' not found', Logs.LEVEL_WARNING);
    };
};

/**
 * Статичный класс.
 * @type {SocNetStandalone}
 */
SocNetStandalone = new SocNetStandalone();