/**
 * ������� ����-����.
 * @constructor
 */
ElementCardInfo = function () {
    var self = this;

    /**
     * ���������� �� �������.
     * @type {boolean}
     */
    var showed = false;

    /**
     * ���������� X.
     * @type {number}
     */
    this.x = 0;

    /**
     * ���������� Y.
     * @type {number}
     */
    this.y = 0;

    /**
     * ������.
     * @type {number}
     */
    this.width = 0;

    /**
     * ������.
     * @type {number}
     */
    this.height = 0;

    /**
     * �������� ����� �����.
     * @type {GUIDom}
     */
    var domFrame = null;

    /**
     * ������� � ��������.
     * @type {GUIDom}
     */
    var domPosition = null;

    /**
     * ���� 15�15 � �������.
     * @type {GUIDom}
     */
    var dom15x15vsPerson = null;

    /**
     * ���� 3�3 � �������.
     * @type {GUIDom}
     */
    var dom3x3vsPerson = null;

    /**
     * ���� 15�15 � �������.
     * @type {GUIDom}
     */
    var dom15x15vsRobot = null;

    /**
     * ���� 3�3 � �������.
     * @type {GUIDom}
     */
    var dom3x3vsRobot = null;

    /**
     * �������� ������ ��� ��������\����.
     */
    this.init = function () {

        /* ������ ��� */
        domFrame = System.createDom();
        domFrame.backgroundImage = '/images/cardInfo/frame.png';
        /* ������� */

        domPosition = System.createdom(domFrame);
        domPosition.backgroundImage = '/images/cardInfo/textPosition.png';
        /* ���� 15�15vsPerson */
        dom15x15vsPerson = System.createDom(domFrame);
        dom15x15vsPerson.backgroundImage = '/images/cardInfo/text15x15vsPerson.png';
        /* ���� 3x3vsPerson */
        dom3x3vsPerson = System.createDom(domFrame);
        dom3x3vsPerson.backgroundImage = '/images/cardInfo/text3x3vsPerson.png';
        /* ���� 15x15vsRobot */
        dom15x15vsRobot = System.createDom(domFrame);
        dom15x15vsRobot.backgroundImage = '/images/cardInfo/text15x15vsRobot.png';
        /* ���� 3x3vsRobot */
        dom3x3vsRobot = System.createDom(domFrame);
        dom3x3vsRobot.backgroundImage = '/images/cardInfo/text3x3vsRobot.png';
    };

    /**
     * ������� �������.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        /* �������� ��������\����. */
        self.redraw();
    };

    /**
     * ������� �������.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        /* �������� ��������\����. */
    };

    /**
     * ���������� �������.
     */
    this.redraw = function () {
        if (!showed) return;
        /* ����������� ���������\�����. */
    };
};