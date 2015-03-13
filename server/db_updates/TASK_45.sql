-- DROP TABLE IF EXISTS `statistic`;

CREATE TABLE `statistic` (
  `id`          INT(11) UNSIGNED        NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `userId`      INT(11)                 NOT NULL,
  `timeStamp`   BIGINT(11) UNSIGNED     NOT NULL,
  `statisticId` INT(11)                 NOT NULL
)
  ENGINE =InnoDB
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;