
DROP TABLE IF EXISTS `tbl_tmp_1`;

CREATE TABLE `tbl_tmp_1`(
 position int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
 userId int(11) UNSIGNED,
 score15x15vsPerson int(11) UNSIGNED,
 score3x3vsPerson int(11) UNSIGNED,
 score15x15vsRobot int(11) UNSIGNED,
 score3x3vsRobot int(11) UNSIGNED
);

INSERT INTO tbl_tmp_1 ( userId, score15x15vsPerson, score3x3vsPerson, score15x15vsRobot, score3x3vsRobot ) SELECT * FROM

(SELECT
 id,
 score15x15vsPerson as score1,
 score3x3vsPerson,
 score15x15vsRobot,
 score3x3vsRobot
FROM users
ORDER BY
 score15x15vsPerson DESC,
 score3x3vsPerson DESC,
 score15x15vsRobot DESC,
 score3x3vsRobot DESC,
 id ASC
) as table1;

TRUNCATE rating;


INSERT INTO rating (position, userId, score15x15vsPerson, score3x3vsPerson, score15x15vsRobot, score3x3vsRobot)
SELECT  position, userId, score15x15vsPerson, score3x3vsPerson, score15x15vsRobot, score3x3vsRobot FROM tbl_tmp_1;

DROP TABLE tbl_tmp_1;