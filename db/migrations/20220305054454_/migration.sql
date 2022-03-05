/*
  Warnings:

  - You are about to alter the column `startTime` on the `Schedule` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "startTime" INTEGER NOT NULL DEFAULT 100,
    "meetingId" INTEGER NOT NULL,
    CONSTRAINT "Schedule_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Schedule" ("createdAt", "dayOfWeek", "id", "meetingId", "startTime", "updatedAt") SELECT "createdAt", "dayOfWeek", "id", "meetingId", "startTime", "updatedAt" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
