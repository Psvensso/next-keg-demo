-- CreateTable
CREATE TABLE "courses" (
    "instituteName" TEXT NOT NULL,
    "instituteNameSlug" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "courseNameSlug" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "deliveryMethod" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "language" TEXT,
    "startDate" DATETIME NOT NULL
);
