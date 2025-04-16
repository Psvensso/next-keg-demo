-- CreateTable
CREATE TABLE "courses" (
    "CourseId" TEXT NOT NULL PRIMARY KEY,
    "InstituteName" TEXT NOT NULL,
    "CourseName" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "DeliveryMethod" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "Language" TEXT,
    "StartDate" DATETIME NOT NULL
);
