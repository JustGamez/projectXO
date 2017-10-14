  -- DROP TABLE IF EXISTS `users`;

  CREATE TABLE `users` (
    `id`                 INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `firstName`          VARCHAR(128)     NOT NULL,
    `lastName`           VARCHAR(128)     NOT NULL,
    `socNetUserId`       INT(11) UNSIGNED NOT NULL,
    `socNetTypeId`       INT(11) UNSIGNED NOT NULL,
    `createTimestamp`    INT(11) UNSIGNED NOT NULL,
    `lastLoginTimestamp` INT(11) UNSIGNED NOT NULL,
    `score`              INT(11) UNSIGNED NOT NULL,
    `socNetUpdated`     INT(11) UNSIGNED NOT NULL,
    KEY `socNetUniqueKey` (`socNetUserId`, `socNetTypeId`)
  )
    ENGINE =InnoDB
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;