DROP TABLE IF EXISTS `rating`;

CREATE TABLE `rating` (
  `userId`   INT(11) UNSIGNED NOT NULL,
  `score`    INT(11)          NOT NULL DEFAULT 0,
  `position` INT(11)          NOT NULL DEFAULT 0,
  `updated`  INT(11)          NOT NULL DEFAULT 0
)
  ENGINE =InnoDB
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;