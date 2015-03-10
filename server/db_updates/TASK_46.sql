ALTER TABLE users ADD COLUMN score15x15vsPerson INT(11) UNSIGNED NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN score3x3vsPerson INT(11) UNSIGNED NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN score15x15vsRobot INT(11) UNSIGNED NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN score3x3vsRobot INT(11) UNSIGNED NOT NULL DEFAULT 0;

-- recalculate score by field type and vsRobot or not. fieldTypeId: 1== 3x3, 2 == 15x15;
UPDATE users SET score15x15vsPerson = (SELECT COUNT(*) FROM games where winnerId = users.id and fieldTypeId = 2 AND vsRobot = 0);
UPDATE users SET score15x15vsRobot = (SELECT COUNT(*) FROM games where winnerId = users.id and fieldTypeId = 2 AND vsRobot = 1);
UPDATE users SET score3x3vsPerson = (SELECT COUNT(*) FROM games where winnerId = users.id and fieldTypeId = 1 AND vsRobot = 0);
UPDATE users SET score3x3vsRobot = (SELECT COUNT(*) FROM games where winnerId = users.id and fieldTypeId = 1 AND vsRobot = 1);

-- recalculate rating

CREATE TABLE tbl_tmp_1 (
 id int(11) auto_increment primary key not null,
 userId int(11) unsigned,
 score int(11) unsigned
);

INSERT INTO tbl_tmp_1 ( userId, score ) SELECT * FROM
( SELECT userId, score FROM (
SELECT users.id as userId, CASE WHEN  t1.score IS NULL THEN 0 ELSE t1.score END as score, CASE WHEN maxId IS NULL THEN 1000000000 ELSE maxId END as maxId FROM users LEFT JOIN (SELECT winnerId, count(*) as score, MAX(id) as maxId FROM games WHERE winnerId != 0 AND fieldTypeId = 2 AND vsRobot = 0 GROUP BY winnerId) as t1 ON t1.winnerId = users.id  ORDER BY t1.score DESC, maxId ASC, users.id ASC
) as t1
) as t2;

TRUNCATE rating;

INSERT INTO rating (userId, position, score) SELECT userId, id, score FROM tbl_tmp_1;

DROP TABLE tbl_tmp_1;

ALTER TABLE users DROP COLUMN score;