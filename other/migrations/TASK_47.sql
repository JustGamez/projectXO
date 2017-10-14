ALTER TABLE users ADD COLUMN lastLogoutTimestamp BIGINT(11) UNSIGNED NOT NULL DEFAULT 0;
UPDATE users SET lastLogoutTimestamp = createTimestamp;