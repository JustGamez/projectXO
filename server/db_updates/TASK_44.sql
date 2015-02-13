DROP TABLE IF EXISTS `profiling`;

CREATE TABLE `profiling` (
  `id`        INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `datetime`  INT(11)          NOT NULL,
  `profileId` INT(11)          NOT NULL,
  `sumTime`   INT(11)          NOT NULL,
  `count`     INT(11)          NOT NULL
)
  ENGINE =InnoDB
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;