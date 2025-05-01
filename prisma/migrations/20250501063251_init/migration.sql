-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "instituteName" TEXT NOT NULL,
    "instituteNameSlug" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "courseNameSlug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "deliveryMethod" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "language" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_courses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorite_courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseFilter" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "filter" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CourseFilter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseDescription" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPhone" TEXT NOT NULL,
    "applicationText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favorite_courses_userId_courseId_key" ON "favorite_courses"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "favorite_courses" ADD CONSTRAINT "favorite_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
