-- AlterTable
ALTER TABLE `HomeSolution`
  ADD COLUMN `deliverables` JSON NULL,
  ADD COLUMN `idealFor` JSON NULL;

UPDATE `HomeSolution` SET `deliverables` = JSON_ARRAY() WHERE `deliverables` IS NULL;
UPDATE `HomeSolution` SET `idealFor` = JSON_ARRAY() WHERE `idealFor` IS NULL;

ALTER TABLE `HomeSolution`
  MODIFY `deliverables` JSON NOT NULL,
  MODIFY `idealFor` JSON NOT NULL;
