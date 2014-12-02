DROP TABLE IF EXISTS `users`;

CREATE TABLE `users`(
    `id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `firstName` VARCHAR(128) NOT NULL,
    `lastName` VARCHAR(128) NOT NULL,
    `socNetUserId` INT(11) NOT NULL,
    `socNetTypeId` INT(11) NOT NULL,
    `createTimestamp` INT(11) NOT NULL,
    `lastLoginTimestamp` INT(11) NOT NULL,
    `score` INT(11) NOT NULL
)
ENGINE=InnoDB
DEFAULT CHARACTER SET utf8
DEFAULT COLLATE utf8_general_ci;