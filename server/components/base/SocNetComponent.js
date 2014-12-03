/**
 * Компонент для работы с социально сетью.
 * @constructor
 */
var MD5 = require('MD5');

SocNetComponent = function () {
    var self = this;

    this.inCheckAuthVK = function (socNetUserId, authParams) {
        var generatedAuthKey;
        /*	auth_key = md5(app_id+'_'+viewer_id+'_'+app_secret); */
        generatedAuthKey = MD5(authParams.appId + '_' + socNetUserId + '_' + 'X0x2PuCZQbC5wwX0lB5R');
        return generatedAuthKey == authParams.authKey;
    }
};

/**
 * Тип социальной сети вКонтакте.
 * @type {number}
 */
SocNetComponent.TYPE_VK = 1;