-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "instituteName" TEXT NOT NULL,
    "instituteNameSlug" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "courseNameSlug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "deliveryMethod" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "language" TEXT,
    "startDate" DATETIME NOT NULL
);
