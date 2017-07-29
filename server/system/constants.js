/* Init constants */

var FS = require('fs');
var PATH = require('path');

PROJECT_FOLDER_NAME = FS.realpathSync('./..').split('/').pop();
DIR_ROOT = FS.realpathSync('./..') + PATH.sep;
DIR_SERVER = DIR_ROOT + 'server' + PATH.sep;
DIR_COMPONENTS = DIR_SERVER + 'components' + PATH.sep;
DIR_CLIENT = DIR_ROOT + 'client' + PATH.sep;
IS_SERVER_SIDE = true;
IS_CLIENT_SIDE = false;