DROP TABLE IF EXISTS `games`;

CREATE TABLE `games`(
    `id` INT(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `creatorUserId` INT(11) unsigned NOT NULL DEFAULT '0',
    `joinerUserId` INT(11) unsigned NOT NULL DEFAULT '0',
    `creatorSignId` INT(11) NOT NULL DEFAULT '0',
    `joinerSignId` INT(11) NOT NULL DEFAULT '0',
    `fieldTypeId` INT(11) NOT NULL DEFAULT '0',
    `isRandom` INT(11) NOT NULL DEFAULT '0',
    `isInvitation` INT(11) NOT NULL DEFAULT '0',
    `vsRobot` INT(11) NOT NULL DEFAULT '0',
    `XUserId` INT(11) NOT NULL DEFAULT '0',
    `OUserId` INT(11) NOT NULL DEFAULT '0',
    `turnId` int(11) NOT NULL default '0',
    `result_field` VARCHAR(481) NOT NULL default '',
    `status` int(11) NOT NULL default '0',
    `winnerId` int(11) NOT NULL default '0',
    KEY `status` (`status`),
    KEY `creatorUserId` (`creatorUserId`),
    KEY `joinerUserId` (`joinerUserId`),
    KEY `isRandom` (`isRandom`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE utf8_general_ci;
