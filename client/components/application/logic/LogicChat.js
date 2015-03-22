LogicChat = function () {

    var cache = [];

    var cacheIds = [];

    this.addList = function (newMessages) {
        newMessages.forEach(function (newMessage) {
            if (newMessage.id) {
                if (cacheIds[newMessage.id]) return;
                cacheIds[newMessage.id] = true;
            }
            cache.unshift(newMessage);
        });
        pageController.redraw();
    };

    this.updateId = function (messageIdwith) {
        cache.forEach(function (message, index) {
            if (message.id) return;
            if (message.userId != messageIdwith.userId) return;
            if (message.timestamp != messageIdwith.timestamp) return;
            if (message.text != messageIdwith.text) return;
            if (message.withUserId != messageIdwith.withUserId) return;
            message.id = messageIdwith.id;
            cacheIds[message.id] = true;
        });
        pageController.redraw();
    };

    this.update = function (sourceMessage) {
        cache.forEach(function (message, index) {
            if (message.id != sourceMessage.id) return;
            cache[index] = sourceMessage;
        });
        pageController.redraw();
    };

    var waitMessagesBeforeId = [];

    /**
     * @todo start unused ...
     * @param start
     * @param count
     * @param withUserId
     * @returns {Array.<T>|*}
     */
    this.getMessages = function (start, count, withUserId) {
        var out, i, lastId, currentUser, isMember, withMember;
        if (!waitMessagesBeforeId[withUserId]) waitMessagesBeforeId[withUserId] = [];
        currentUser = LogicUser.getCurrentUser();
        sortChat();
        out = [];
        lastId = Infinity;
        cache.forEach(function (message) {
            lastId = message.id < lastId ? message.id : lastId;
            if (message.blocked) return;
            isMember = message.userId == currentUser.id || message.withUserId == currentUser.id;
            withMember = message.userId == withUserId || message.withUserId == withUserId;
            if (withUserId != 0 && !(isMember && withMember)) return;
            if (withUserId == 0 && message.withUserId != 0) return;
            if (i == count) return;
            out.push(message);
            i++;
        });
        if (out.length < count && lastId < Infinity && waitMessagesBeforeId[withUserId][lastId] != true) {
            waitMessagesBeforeId[withUserId][lastId] = true;
            SAPIChat.sendMeMessagesBeforeId(lastId, withUserId);
        }
        out.reverse();
        return out;
    };

    /**
     * ВНИМАНИЕ: сортировка идёт в обратном порядке!
     */
    var sortChat = function () {
        cache.sort(function (a, b) {
            if (a.id == 0 || b.id == 0) return 0;
            if (a.id > b.id) return -1;
            if (a.id < b.id) return +1;
            return 0;
        });
        cache.sort(function (a, b) {
            if (a.timestamp > b.timestamp) return -1;
            if (a.timestamp < b.timestamp) return +1;
            return 0;
        });
    };

    //@todo вынести в отдельный файл , класс, таблицу, like a CensureVocabulary.processIt();
    /**
     * Словарь не цензурных слов, все они будут удалены из сообщеий и не отображаются пользователям.
     * @type {string[]}
     */
    var censureVocabulary = [
        'млять',
        'блядина',
        'ебина',
        'охуеть',
        'ахуеть',
        'бля',
        'блять',
        'блядь',
        'бляди',
        'ебать',
        'ебаться',
        'ебанные',
        'ебаные',
        'ебанько',
        'ебать',
        'пизда',
        'пиздабол',
        'хуй',
        'нахуй',
        'апездал',
        'апездошенная',
        'пизды',
        'блядки',
        'блядовать',
        'блядство',
        'блядь',
        'пизде',
        'пизду',
        'взъёбка',
        'впиздячить',
        'нихуя',
        'вхуюжить',
        'вхуярить',
        'вхуячить',
        'выебать',
        'выебон',
        'выёбываться',
        'выпиздеться',
        'выпиздить',
        'гомосек',
        'ебанной',
        'хуя',
        'хуя',
        'доебаться',
        'долбоёб',
        'допиздеться',
        'допизды',
        'дуроёб',
        'ебало',
        'ебальник',
        'ебанатик',
        'ёбанный',
        'ебанутый',
        'ебануть',
        'ёбаный',
        'ебаришка',
        'ёбарь',
        'ебаторий',
        'ебать',
        'ебаться',
        'ебаться',
        'ебистика',
        'ебическая',
        'еблан',
        'ебливая',
        'еблище',
        'ебло',
        'еблом',
        'ёбля',
        'ёбнутый',
        'ёбнуть',
        'ёбнуться',
        'ёболызнуть',
        'ебош',
        'ёбс',
        'еблысь',
        'ебукентий',
        'ебунок',
        'хуйню',
        'заёб',
        'заебал',
        'заёбанный',
        'заебатый',
        'заебать',
        'заебаться',
        'заебись',
        'запиздеть',
        'захуярить',
        'злаебучий',
        'злоебучая',
        'испиздить',
        'исхуячить',
        'колдоебина',
        'коноёбиться',
        'манда',
        'мандовошка',
        'мозгоёб',
        'мокрощелка',
        'мудоёб',
        'хуй',
        'хую',
        'хуя',
        'наебал',
        'наебаловка',
        'наебка',
        'наебнуть',
        'наебнуться',
        'напиздеть',
        'напиздить',
        'настоебать',
        'нахуяриться',
        'нехуй',
        'хуя',
        'однохуйственно',
        'опизденеть',
        'остопиздеть',
        'отебукать',
        'отпиздить',
        'отхуевертить',
        'отъебаться',
        'отъебись',
        'охуевший',
        'охуенно',
        'охуенный',
        'охуеть',
        'охуительный',
        'охуячить',
        'перехуярить',
        'пидарас',
        'пизда',
        'пизданутый',
        'пиздануть',
        'пиздатый',
        'пиздёж',
        'пизденыш',
        'пиздёныш',
        'пиздеть',
        'пиздец',
        'пиздить',
        'пиздобол',
        'пиздобратия',
        'пиздой',
        'пиздолет',
        'пиздорванец',
        'пиздорванка',
        'пиздошить',
        'пиздуй',
        'пиздун',
        'пизды',
        'пиздюк',
        'пиздюлей',
        'пиздюли',
        'пиздюлина',
        'пиздюрить',
        'пиздюхать',
        'пиздюшник',
        'подзалупный',
        'поебать',
        'поебень',
        'поебустика',
        'попиздеть',
        'попиздили',
        'хую',
        'похуярили',
        'приебаться',
        'припиздак',
        'припиздить',
        'прихуярить',
        'проебать',
        'проебаться',
        'пропиздить',
        'разёбанный',
        'разъебай',
        'разъебанный',
        'разъебать',
        'разъебаться',
        'распиздон',
        'распиздяй',
        'распиздяй',
        'расхуюжить',
        'хуеву',
        'хуеву',
        'еби',
        'хуй',
        'спиздить',
        'сука',
        'сучка',
        'схуярить',
        'трахать',
        'хуй',
        'угондошить',
        'уебан',
        'уебать',
        'уебок',
        'уёбывать',
        'упиздить',
        'хитровыебанный',
        'хуй',
        'худоёбина',
        'хуебратия',
        'хуёв',
        'хуеватенький',
        'хуевато',
        'хуевертить',
        'хуёвина',
        'хуёвничать',
        'хуево',
        'хуёво',
        'хуёвый',
        'хуеглот',
        'хуегрыз',
        'хуё',
        'хуемырло',
        'хуеплёт',
        'хуесос',
        'хуета',
        'хуетень',
        'хуеть',
        'хуй',
        'хуила',
        'хуйло',
        'хуйнуть',
        'хуйню',
        'хуйня',
        'хуистика',
        'хуй',
        'хули',
        'хуя',
        'хуяк',
        'хуями',
        'хуячить',
        'членоплет',
        'членосос',
        'шлюха',
        'шобла',
        'ёбла',
        'су-ка',
        'с-ука',
        'сук-а',
        'трахаться'
    ];

    /**
     * Удалить нецензурные слова\выражения.
     * @param text {string}
     */
    this.censureIt = function (text) {
        var word, removeEx, replacer;

        removeEx = new RegExp("([^A-zА-я])" + "(" + censureVocabulary.join('|') + ")+" + "([^A-zА-я])", "gi");
        text = " " + text + " ";
        text = text.replace(removeEx, function () {
            replacer = '';
            if (arguments[1] != undefined) {
                replacer += arguments[1];
            }
            replacer += '*';
            if (arguments[3] != undefined) {
                replacer += arguments[3];
            }
            return replacer;
        });
        text = text.replace(removeEx, function () {
            replacer = '';
            if (arguments[1] != undefined) {
                replacer += arguments[1];
            }
            replacer += '*';
            if (arguments[3] != undefined) {
                replacer += arguments[3];
            }
            return replacer;
        });
        text = text.substr(1, text.length - 2);
        return text;
    };
};

LogicChat = new LogicChat();