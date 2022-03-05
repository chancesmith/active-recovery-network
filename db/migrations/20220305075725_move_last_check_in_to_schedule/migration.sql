/*
  Warnings:

  - You are about to drop the column `lastCheckIn` on the `Meeting` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "startTime" INTEGER NOT NULL DEFAULT 100,
    "lastCheckIn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meetingId" INTEGER NOT NULL,
    CONSTRAINT "Schedule_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Schedule" ("createdAt", "dayOfWeek", "id", "meetingId", "startTime", "updatedAt") SELECT "createdAt", "dayOfWeek", "id", "meetingId", "startTime", "updatedAt" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
CREATE TABLE "new_Meeting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "placeName" TEXT,
    "address" TEXT,
    "state" TEXT,
    "city" TEXT,
    "zip" TEXT,
    "country" TEXT NOT NULL DEFAULT 'US'
);
INSERT INTO "new_Meeting" ("address", "city", "country", "createdAt", "email", "id", "link", "name", "phone", "placeName", "state", "status", "updatedAt", "zip") SELECT "address", "city", "country", "createdAt", "email", "id", "link", "name", "phone", "placeName", "state", "status", "updatedAt", "zip" FROM "Meeting";
DROP TABLE "Meeting";
ALTER TABLE "new_Meeting" RENAME TO "Meeting";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
