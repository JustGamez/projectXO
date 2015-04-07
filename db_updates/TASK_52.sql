-- DROP TABLE IF EXISTS `notifies`;

CREATE TABLE notifies (
    userId INT(11) UNSIGNED NOT NULL PRIMARY KEY,
    socNetUserId INT(11) UNSIGNED NOT NULL,
    isAppUser TINYINT(1) NOT NULL DEFAULT 1,
    lastCheck INT(11) UNSIGNED NOT NULL DEFAULT 0,
    lastNotify INT(11) UNSIGNED NOT NULL DEFAULT 0,
    lastPosition INT(11) UNSIGNED NOT NULL DEFAULT 0
);

TRUNCATE notifies;

INSERT INTO notifies (userId, socNetUserId, isAppUser, lastCheck, lastNotify)
    SELECT id, socNetUserId,0,0,0 FROM users;


-- ALTER TABLE rating ADD COLUMN updated INT(11) UNSIGNED NOT NULL;

UPDATE rating SET updated = (SELECT MAX(finish) FROM games WHERE winnerId = rating.userId);