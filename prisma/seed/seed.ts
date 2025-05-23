import prisma from "@/db/prismaClient";
import csv from "csv-parser";
import * as fs from "fs";
import * as path from "path";
import stripBom from "strip-bom-stream";
import { fileURLToPath } from "url";

//Makes a url safe slug name from a course title
function sluggify(str: string) {
  str = str.replace(/å/g, "a");
  str = str.replace(/ä/g, "a");
  str = str.replace(/ö/g, "o");
  str = str.toLowerCase();
  str = str.replace(/\s+/g, "-"); // Replace spaces with hyphens
  str = str.replace(/&/g, "-and-"); // Replace & with 'and'
  str = str.replace(/[^\w-]+/g, ""); // Remove all non-word chars
  str = str.replace(/--+/g, "-"); // Replace multiple hyphens with single hyphen
  str = str.replace(/^-+/, ""); // Trim - from start of text
  str = str.replace(/-+$/, ""); // Trim - from end of text
  return str;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type CourseCsvRow = {
  CourseId: string;
  InstituteName: string;
  CourseName: string;
  Category: string;
  DeliveryMethod: string;
  Location: string;
  Language: string;
  StartDate: string;
};

async function saveRow(row: CourseCsvRow) {
  try {
    const instituteNameSlug = sluggify(row.InstituteName);
    const courseNameSlug = sluggify(row.CourseName);
    //Just a little seed test
    if (encodeURIComponent(instituteNameSlug) !== instituteNameSlug) {
      throw "bad seed, instituteNameSlug: " + instituteNameSlug;
    }
    if (encodeURIComponent(courseNameSlug) !== courseNameSlug) {
      throw "bad seed, courseNameSlug: " + courseNameSlug;
    }

    await prisma.course.upsert({
      create: {
        id: row.CourseId,
        instituteName: row.InstituteName,
        instituteNameSlug,
        courseName: row.CourseName,
        courseNameSlug,
        category: row.Category,
        deliveryMethod: row.DeliveryMethod,
        location: row.Location,
        language: row.Language === "NULL" ? null : row.Language,
        startDate: new Date(row.StartDate),
      },
      update: {
        instituteName: row.InstituteName,
        instituteNameSlug,
        courseName: row.CourseName,
        courseNameSlug,
        category: row.Category,
        deliveryMethod: row.DeliveryMethod,
        location: row.Location,
        language: row.Language === "NULL" ? null : row.Language,
        startDate: new Date(row.StartDate),
      },
      where: {
        id: row.CourseId,
      },
    });
  } catch (error) {
    console.error(`Error processing course ${row.CourseName}:`, error);
  }
}

async function seedDatabase() {
  // Delete all data from tables in reverse order of dependencies
  await prisma.application.deleteMany({});
  await prisma.favoriteCourse.deleteMany({});
  await prisma.courseFilter.deleteMany({});
  await prisma.course.deleteMany({});

  console.log("Database cleaned, starting seed process...");

  const filePath = path.join(__dirname, "technical_assignment_input_data.csv");

  const rows: CourseCsvRow[] = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(stripBom())
      .pipe(
        csv({
          separator: ";",
        })
      )
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", async () => {
        resolve(true);
      })
      .on("error", (error) => {
        reject(error);
      });
  });

  console.log(`Seeding ${rows.length} courses...`);
  for (const row of rows) {
    await saveRow(row);
  }
  console.log("Seeding completed successfully.");
}

seedDatabase().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
