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

-- CreateTable
CREATE TABLE "favorite_courses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "favorite_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "favorite_courses_userId_courseId_key" ON "favorite_courses"("userId", "courseId");
