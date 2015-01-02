DROP TABLE IF EXISTS `chat_messages`;

CREATE TABLE `chat_messages` (
    `id` INT(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `userId` INT(11) unsigned NOT NULL,
    `text` VARCHAR(128) NOT NULL,
    `timestamp` INT(11) unsigned NOT NULL
)
ENGINE=InnoDB
DEFAULT CHARACTER SET utf8
DEFAULT COLLATE utf8_general_ci;