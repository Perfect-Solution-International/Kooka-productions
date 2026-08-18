-- AlterTable
ALTER TABLE `User` ADD COLUMN `name` VARCHAR(191) NOT NULL DEFAULT '';

-- Existing accounts predate the column, so their display name is seeded from
-- the local part of the email rather than left blank.
UPDATE `User` SET `name` = SUBSTRING_INDEX(`email`, '@', 1) WHERE `name` = '';

-- The default existed only to make adding a NOT NULL column safe.
ALTER TABLE `User` ALTER COLUMN `name` DROP DEFAULT;

-- DropColumn
ALTER TABLE `User` DROP COLUMN `role`;
